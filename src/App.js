import React, { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [archive, setArchive] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, author, category, content };
    setPosts([...posts, newPost]);
    setTitle('');
    setCategory('');
    setAuthor('');
    setContent('');
  };

  const handleArchiveClick = (title) => {
    const archivedPost = posts.find(post => post.title === title);
    if (archivedPost) {
      const updatedPosts = posts.filter(post => post.title !== title);
      setPosts(updatedPosts);
      const updatedArchive = [...archive, archivedPost];
      setArchive(updatedArchive);
    } else {
      const updatedArchive = archive.concat(posts.filter(post => post.title === title));
      setArchive(updatedArchive);
      const updatedPosts = posts.filter(post => post.title !== title);
      setPosts(updatedPosts);
    }
  };

  const handleDeleteClick = (title) => {
    const updatedPosts = posts.filter(post => post.title !== title);
    setPosts(updatedPosts);
  };

  return (
    <div className="App">
      <div className="blog">
        <header className="blog-header">
          <h1>Блог</h1>
        </header>
        <main className="blog-content">
          <div className="post-list">
            <div className="post-title">
              <h2>Записи</h2>
            </div>
            {posts.length === 0 && <p>Нет записей</p>}
            {posts.map((post, index) => (
              <article key={index} className="blog-post">
                <h1>{post.title}</h1>
                <p>Автор: <span><b>{post.author}</b></span></p>
                <p>Категория: <span><b>{post.category}</b></span></p>
                <p>{post.content}</p>
                <div className="buttons">
                  <button className="delete-button" onClick={() => handleDeleteClick(post.title)}>Удалить</button>
                  <button className="archive-button" onClick={() => handleArchiveClick(post.title)}>Архив</button>
                </div>
              </article>
            ))}
          </div>
          <div className="side-content">
            <aside className="create-post">
              <h2>Создать запись</h2>
              <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="author">Автор:</label>
                  <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                <label htmlFor="title">Заголовок:</label>
                  <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="category">Категория:</label>
                  <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="content">Содержание:</label>
                  <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
                 
                </div>
                <button type="submit" className="create-button">Создать</button>
              </form>
              <div className="archive">
              <h2>Архив</h2>
                <ul>
                  {archive.map((post, index) => (
                    <li key={index}>
                      {post.title}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;