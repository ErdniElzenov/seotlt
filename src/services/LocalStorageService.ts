import { News } from "../types/News";

export const LocalStorageService = {
    getNews: (): News[] => {
      const news = localStorage.getItem('news');
      return news ? JSON.parse(news) : [];
    },
    saveNews: (news: News[]) => {
      localStorage.setItem('news', JSON.stringify(news));
    }
  };
  