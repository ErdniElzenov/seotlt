import React, { useState } from "react";
import { News } from "../types/News";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./index.scss";
interface NewsFormProps {
  onAddNews: (news: News) => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ onAddNews }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const newNews: News = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toISOString(),
    };
    onAddNews(newNews);
    setTitle("");
    setContent("");
  };

  return (
    <div className="newsform">
      <div className="newsform__input">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
      </div>

      <Button className="newsform__button" onClick={handleSubmit}>
        Add News
      </Button>
    </div>
  );
};

export default NewsForm;
