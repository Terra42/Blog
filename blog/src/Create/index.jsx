import { useState } from 'react';
import { useHistory } from 'react-router';

const Create = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const blog = { title, text, author };
    setIsPending(true);

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    }).then(() => {
      setIsPending(false);
      history.push('/');
    });
  };

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label>Text</label>
        <textarea
          required
          cols="30"
          rows="10"
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></textarea>
        <label>Author</label>
        <input
          type="text"
          required
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        {isPending ? (
          <button disabled={true}>Wait...</button>
        ) : (
          <button>Add article</button>
        )}
      </form>
    </div>
  );
};

export default Create;
