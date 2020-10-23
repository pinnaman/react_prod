-- High CPU Usage

select q2.mins,q2.sql_text,q1.* from

(

select username,sid,serial#,

       round((cpu_usage/(

                        select sum(value) total_cpu_usage

                          from gv$sesstat t

                         inner join gv$session  s on ( t.sid = s.sid )

                         inner join gv$statname n on ( t.statistic# = n.statistic# )

                         where n.name like '%CPU used by this session%'

                           and nvl(s.sql_exec_start, s.prev_exec_start) >= sysdate-1/24

                        ))*100,2) cpu_usage_per_cent,

       module_info,client_info ,machine,

       count(1) over (partition by client_info) client_sess_cnt

     ---  SELECT SQL_text 

  from

(

select nvl(s.username,'Oracle Internal Proc.') username,s.sid,s.serial#,t.value cpu_usage, nvl(s.module, s.program) module_info, decode(s.osuser,'oracle', s.client_info, s.osuser) client_info

  ,s.machine

  from gv$sesstat t

       inner join gv$session  s on ( t.sid = s.sid )

       inner join gv$statname n on ( t.statistic# = n.statistic# )

 where n.name like '%CPU used by this session%'

   and nvl(s.sql_exec_start, s.prev_exec_start) >= sysdate-1/24

) s1

) q1 

,(SELECT (sysdate - start_time)*24*60 AS mins,sqla.sql_text,username,sid, serial#,

        TO_CHAR(CURRENT_TIMESTAMP,'HH24:MI:SS') AS curr,

      TO_CHAR(start_time,'HH24:MI:SS') AS logon

       --- (sysdate - start_time)*24*60 AS mins

 FROM V$SESSION_LONGOPS vsops, v$sqlarea sqla

 WHERE   vsops.sql_id = sqla.sql_id

   AND vsops.username is not NULL

   AND (SYSDATE - start_time)*24*60 > 1 

) q2

where q1. username = q2.username(+)

AND q1.sid = q2.sid(+)

AND q1.serial# = q2.serial#(+)

AND q1.username = 'HYAWS'

--AND q1.cpu_usage_per_cent > 0

order by q1.cpu_usage_per_cent desc;


SELECT * FROM (

SELECT DISTINCT (sysdate - start_time)*24*60 AS mins,sqla.sql_text,username,sid, serial#,

        TO_CHAR(CURRENT_TIMESTAMP,'HH24:MI:SS') AS curr,

      TO_CHAR(start_time,'HH24:MI:SS') AS logon,

       ROW_NUMBER() OVER (PARTITION BY sql_text ORDER BY start_time) rnk

 FROM V$SESSION_LONGOPS vsops, v$sqlarea sqla

 WHERE   vsops.sql_id = sqla.sql_id

   AND vsops.username is not NULL

   AND (SYSDATE - start_time)*24*60 > 1 

 ) ORDER BY mins desc



-- Indexes Status

select index_name,index_type,status from dba_indexes where owner = 'HYAWS' and table_name = 'BONDDATA' and status != 'N/A'

union

select distinct index_name,null,status from dba_ind_partitions where index_owner = 'HYAWS' and index_name in (

select index_name from dba_indexes where owner = 'HYAWS' and table_name = 'BONDDATA')


-- Large Tables and Sizes

SELECT q2.* FROM (

SELECT DISTINCT segment_name,segment_type,

sum(gb) OVER (PARTITION BY SEGMENT_NAME ) total_size,

total_rows,

last_analyzed

FROM

(

select

    s.SEGMENT_NAME,

    s.SEGMENT_TYPE,

    s.BYTES/1024/1024/1024 GB,

    s.TABLESPACE_NAME,

    DT.NUM_ROWS,

    DT.NUM_ROWS total_rows,

    DT.last_analyzed 

from

    dba_segments S,DBA_TABLES DT

    WHERE s.owner in ('HYAWS','MSTAR') ---AND s.SEGMENT_NAME in ('BONDDATA','MORN_HOLDING')

    AND S.SEGMENT_NAME = DT.TABLE_NAME

) q1

) q2 WHERE total_size >= 500 AND ROWNUM <= 10 

---AND last_analyzed >= trunc(sysdate)-7

ORDER BY total_rows DESC



-- High IO and disk reads 

SELECT t2.username, t1.disk_reads, t1.executions,

    t1.disk_reads / DECODE(t1.executions, 0, 1, t1.executions) as exec_ratio,

    t1.command_type, t1.sql_text

  FROM v$sqlarea t1, dba_users t2

  WHERE t1.parsing_user_id = t2.user_id

    AND t1.disk_reads > 100000

    AND t2.username = 'HYAWS'

  ORDER BY t1.disk_reads DESC

  

 

 -- Long Running SQL

 SELECT (sysdate - start_time)*24*60 AS mins,sqla.sql_text,username,sid, serial#,

        TO_CHAR(CURRENT_TIMESTAMP,'HH24:MI:SS') AS curr,

      TO_CHAR(start_time,'HH24:MI:SS') AS logon

       --- (sysdate - start_time)*24*60 AS mins

 FROM V$SESSION_LONGOPS vsops, v$sqlarea sqla

 WHERE   vsops.sql_id = sqla.sql_id

   AND vsops.username is not NULL

   AND (SYSDATE - start_time)*24*60 > 1 ;

  

  

  SELECT * FROM DBA_SOURCE 

  SELECT * FROM v$sqlarea

  

  -- CPU Usage

    select * from 

    (SELECT value cpu_util_pct

       FROM v$sysmetric

      WHERE metric_name = 'Host CPU Utilization (%)'

        AND group_id=2) ,

    (SELECT value cpu_count

       FROM v$parameter

      WHERE name = 'cpu_count') 

      

      

 -- DBA Avdvisor     

select * from (

select b.ATTR1 as SQL_ID, vs.sql_text, vsess.machine, max(a.BENEFIT) as "Benefit" 

from DBA_ADVISOR_RECOMMENDATIONS a, DBA_ADVISOR_OBJECTS b ,  v$sql vs, dba_hist_active_sess_history vsess

where a.REC_ID = b.OBJECT_ID

and b.ATTR1 = vs.sql_id

and b.ATTR1 = vsess.sql_id

and a.TASK_ID = b.TASK_ID


/*AND ( machine LIKE '%10.20.103.46%'

      OR machine LIKE '%10.20.101.232%'

      OR machine LIKE '%10.20.105.149%' ) */

AND machine like '%10.20.3.149%'

and a.TASK_ID in (select distinct b.task_id

from dba_hist_snapshot a, dba_advisor_tasks b, dba_advisor_log l

where a.begin_interval_time > sysdate - 7 


and  a.dbid = (select dbid from v$database) 

and a.INSTANCE_NUMBER = (select INSTANCE_NUMBER from v$instance) 

and to_char(a.begin_interval_time, 'yyyymmddHH24') = to_char(b.created, 'yyyymmddHH24') 

and b.advisor_name = 'ADDM' 

and b.task_id = l.task_id 

and l.status = 'COMPLETED') 

and length(b.ATTR4) > 1 group by b.ATTR1, vs.sql_text, vsess.machine

order by max(a.BENEFIT) desc) where rownum < 40;


-- CPU/IO(disk reads)

SELECT

    *

FROM

    (

        SELECT

            q1.*,

            ROW_NUMBER() OVER(

                PARTITION BY q1.sql_text

                ORDER BY

                    ROWNUM

            ) sql_rnk

        FROM

            (

                SELECT

                    a.sql_id,

                    vs.sql_text,

                    vsess.machine,

                    vsess.program,

                    trunc(sum(CPU_TIME_DELTA)/1000000/60) CPU_MINS,

                    trunc(sum(ELAPSED_TIME_DELTA)/1000000/60)  ELA_MINS,

                    SUM(disk_reads_delta) sum_disk_reads_delta,

                    COUNT(*)

                FROM

                    dba_hist_sqlstat a,

                    dba_hist_snapshot s,

                    v$sql vs,

                    dba_hist_active_sess_history vsess

                WHERE

                    s.snap_id = a.snap_id

                    AND a.sql_id = vs.sql_id

                    AND a.sql_id = vsess.sql_id

                    AND a.module = vsess.program

                    AND s.begin_interval_time > SYSDATE - 1

                    AND a.parsing_schema_name = 'HYAWS'

                    AND a.module = 'java.lang.Thread'

                    AND ( machine LIKE '%10.20.103.46%'

                          OR machine LIKE '%10.20.101.232%'

                          OR machine LIKE '%10.20.105.149%' )  -- Client facing only/Coldfusion Machines

                GROUP BY

                    a.sql_id,

                    vs.sql_text,

                    vsess.machine,

                    vsess.program

            --    ORDER BY

            ---        SUM(cpu_time_delta) DESC

            ) q1

        WHERE

            ROWNUM < 20

    )

WHERE

    sql_rnk = 1

ORDER BY

    CPU_MINS DESC



SELECT table_name,num_rows,last_analyzed FROM DBA_TABLES WHERE table_name = 'BONDDATA'