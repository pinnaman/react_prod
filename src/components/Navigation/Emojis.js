import React from 'react';
const displayEmojiName = event => alert(event.target.id);
const emojis = [
  {
    emoji: '😀',
    name: "test grinning face"
  },
  {
    emoji: '🎉',
    name: "party popper"
  },
  {
    emoji: '💃',
    name: "woman dancing"
  }
];

const Emojis = () => (
<div>
<ul>
          {
            emojis.map(emoji => (
              <li key={emoji.name}>
                <button
                  onClick={displayEmojiName}
                >
                  <span role="img" aria-label={emoji.name} id={emoji.name}>{emoji.emoji}</span>
                </button>
              </li>
            ))
          }
        </ul>
</div>
)

export default Emojis;
