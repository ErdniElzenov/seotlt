import React, { useEffect, useState } from "react";
import { News } from "../types/News";
import { LocalStorageService } from "../services/LocalStorageService";
import NewsItem from "./NewsItem";
import NewsForm from "./NewsForm";
import "./index.scss";
const NewsList: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    setNewsList(LocalStorageService.getNews());
  }, []);

  const addNews = (news: News) => {
    const updatedList = [...newsList, news];
    setNewsList(updatedList);
    LocalStorageService.saveNews(updatedList);
  };

  const editNews = (updatedNews: News) => {
    const updatedList = newsList.map((item) =>
      item.id === updatedNews.id ? updatedNews : item
    );
    setNewsList(updatedList);
    LocalStorageService.saveNews(updatedList);
  };

  const deleteNews = (id: string) => {
    const updatedList = newsList.filter((item) => item.id !== id);
    setNewsList(updatedList);
    LocalStorageService.saveNews(updatedList);
  };

  return (
    <div className="newslist">
      <h1>News List</h1>
      <NewsForm onAddNews={addNews} />
      {newsList
        .map((news) => (
          <NewsItem
            key={news.id}
            news={news}
            onDelete={deleteNews}
            onEdit={editNews}
          />
        ))
        .reverse()}
    </div>
  );
};

export default NewsList;
