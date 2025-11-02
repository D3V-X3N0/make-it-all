import React, { useState } from "react";
import { FaSearch, FaAd, FaUserCircle, FaComment } from "react-icons/fa";
import "./topics.css";

export default function Topics() {
  const [topics, setTopics] = useState({
    technical: [
      { name: "Software Development", posts: ["This is some content", "This is some content"] },
      { name: "Software Issues", posts: ["This is some content", "This is some content"] },
    ],
    nonTechnical: [{ name: "Printing", posts: ["This is some content", "This is some content"] }],
  });

  const [currentTopic, setCurrentTopic] = useState("Software Development");
  const [searchText, setSearchText] = useState("");
  const [addText, setAddText] = useState("");
  const [isTechnical, setIsTechnical] = useState(true);
  const [newPost, setNewPost] = useState("");

  const showContent = (name) => setCurrentTopic(name);

  const addTopic = () => {
    if (!addText.trim()) { alert("Please enter a name."); return; }
    const newTopic = { name: addText.toLowerCase(), posts: [] };
    const category = isTechnical ? "technical" : "nonTechnical";
    setTopics(prev => ({ ...prev, [category]: [...prev[category], newTopic] }));
    setAddText("");
  };

  const searchTopic = () => {
    const all = [...topics.technical, ...topics.nonTechnical];
    const match = all.find(t => t.name.toLowerCase() === searchText.toLowerCase());
    if (match) setCurrentTopic(match.name);
    else alert("Topic not found.");
    setSearchText("");
  };

  const sendPost = () => {
    if (!newPost.trim()) { alert("Please enter your response."); return; }
    const update = (cat) =>
      topics[cat].map(t => (t.name === currentTopic ? { ...t, posts: [...t.posts, newPost] } : t));
    setTopics({ technical: update("technical"), nonTechnical: update("nonTechnical") });
    setNewPost("");
  };

  const current = [...topics.technical, ...topics.nonTechnical].find(t => t.name === currentTopic);

  return (
    <>
      <div id="title">Topics</div>
      <div id="page">
        {/* Sidebar */}
        <div id="topicsSidebar">
          <div id="topics" className="glass">
            <p className="subtitle">Topics</p>
            <p className="subsubtitle">Browse all discussion topics</p>

            <div id="topicNames">
              <div id="technicalTopics">
                <p className="subsubtitle">Technical Topics:</p>
                {topics.technical.map(t => (
                  <button
                    key={t.name}
                    className={`topicName button ${currentTopic === t.name ? "active" : ""}`}
                    onClick={() => showContent(t.name)}
                  >
                    {t.name}
                  </button>
                ))}
              </div>

              <div id="nonTechnicalTopics">
                <p className="subsubtitle">Non-technical Topics:</p>
                {topics.nonTechnical.map(t => (
                  <button
                    key={t.name}
                    className={`topicName button ${currentTopic === t.name ? "active" : ""}`}
                    onClick={() => showContent(t.name)}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div id="topicButtons">
            <div className="topicButton glass">
              <p className="subtitle">Search Topics</p>
              <div className="form-row">
                <input
                  className="input"
                  id="searchText"
                  type="text"
                  placeholder="Enter topic name"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button id="searchButton" className="button" onClick={searchTopic}>
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="topicButton glass">
              <p className="subtitle">Create Topic</p>
              <input
                className="input"
                id="addText"
                type="text"
                placeholder="Topic name"
                value={addText}
                onChange={(e) => setAddText(e.target.value)}
              />
              <textarea
                className="input"
                id="descriptionText"
                placeholder="Description"
                disabled
              />
              <div className="radioGroup">
                <label className="label">
                  <input
                    id="technical"
                    name="category"
                    type="radio"
                    checked={isTechnical}
                    onChange={() => setIsTechnical(true)}
                  />{" "}
                  Technical
                </label>
                <label className="label">
                  <input
                    id="nonTechnical"
                    name="category"
                    type="radio"
                    checked={!isTechnical}
                    onChange={() => setIsTechnical(false)}
                  />{" "}
                  Non-technical
                </label>
              </div>
              <button id="addButton" className="button" onClick={addTopic}>
                Add Topic
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div id="topicsContent">
          <div id="topicInfo" className="glass">
            <p id="topicTitle" className="subtitle">{current?.name}</p>
            <p id="description" className="subsubtitle">This is a topic description.</p>
          </div>

          <div id="topicsPosts" className="glass">
            <p className="subtitle">Discussion</p>

            {current?.posts.map((p, i) => (
              <div key={i} className="post">
                <FaUserCircle className="avatar" />
                <div className="bubble">
                  <div className="meta">User</div>
                  <div className="text">{p}</div>
                </div>
              </div>
            ))}
          </div>

          <div id="addPost" className="glass">
            <p className="subtitle">Add Your Response</p>
            <textarea
              className="input"
              id="text"
              placeholder="Send a post"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <button className="button" id="send" onClick={sendPost}>
              <FaComment /> Send Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
  