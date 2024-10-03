import React, { useEffect, useState, useRef } from "react";
import { News } from "../types/News";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

interface NewsItemProps {
  news: News;
  onDelete: (id: string) => void;
  onEdit: (news: News) => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ news, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(news.title);
  const [content, setContent] = useState(news.content);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowContextMenu((prev) => !prev);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowContextMenu(false);
    }
  };

  const handleSave = () => {
    onEdit({ ...news, title, content });
    setIsEditing(false);
  };

  const handleEditItem = () => {
    setIsEditing(true);
    setShowContextMenu(false);
  };

  const handleDeleteItem = () => {
    onDelete(news.id);
    setShowContextMenu(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      {isEditing ? (
        <div className="newsform">
          <div className="newsform__input">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button className="newsform__button" onClick={handleSave}>
            Save
          </Button>
        </div>
      ) : (
        <div className="newsitem">
          <div className="newsitem__content">
            <h3>{title}</h3>
            <p>{content}</p>
          </div>

          <div className="newsitem__settings">
            <div className="newsitem__settings--point" onClick={handleClick}>
              ...
            </div>

            {showContextMenu ? (
              <div className="newsitem__menu">
                <div className="newsitem__menu--item" onClick={handleEditItem}>
                  edit
                </div>
                <div
                  className="newsitem__menu--item"
                  onClick={handleDeleteItem}
                >
                  delete
                </div>
              </div>
            ) : null}
          </div>
          <div className="newsitem__settingsmob">
            <Button className="newsitem__buttonmob" onClick={handleEditItem}>
              Edit
            </Button>
            <Button className="newsitem__buttonmob" onClick={handleDeleteItem}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsItem;
