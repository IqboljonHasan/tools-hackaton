// components/ToolList.js
export default function ToolList({ tools }) {
    return (
      <ul>
        {tools.map(tool => (
          <li key={tool.id}>
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              {tool.title}
            </a>
          </li>
        ))}
      </ul>
    );
  }
  