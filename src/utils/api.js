let savedArticles = [
  {
    _id: "65f7368dfb74bd6a92114c85",
    title: "Everyone Needs a Special 'Sit Spot' in Nature",
    text: "Ever since I read Richard Louv's influential book, 'Last Child in the Woods,' the idea of having a special 'sit spot' in nature has fascinated me. This concept, which Louv borrowed from Indigenous traditions, involves finding a place in the natural world where you can sit quietly and observe.",
    date: "2020-11-04T12:00:00.000Z",
    source: "Nature.com",
    link: "https://www.nature.com/articles/sit-spot-nature",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    keyword: "nature",
  },
  {
    _id: "65f7371e7bce9e7d331b11a0",
    title: "Nature makes you better",
    text: "We all know how good nature can make us feel. We have known it for millennia. The sounds of the forest, the scent of the trees, the sunlight playing through the leaves, the fresh, clean air — these things give us a sense of comfort.",
    date: "2020-11-04T14:30:00.000Z",
    source: "National Geographic",
    link: "https://www.nationalgeographic.com/nature-makes-you-better",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400",
    keyword: "nature",
  },
  {
    _id: "65f7372f8e1a2c9d441c78b1",
    title: "Grand Canyon National Park",
    text: "The Grand Canyon is a steep-sided canyon carved by the Colorado River in Arizona, United States. The Grand Canyon is 277 miles long, up to 18 miles wide and attains a depth of over a mile.",
    date: "2020-11-05T09:15:00.000Z",
    source: "National Park Service",
    link: "https://www.nps.gov/grca/index.htm",
    image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=400",
    keyword: "national parks",
  },
];

export function getItems() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(savedArticles);
    }, 700);
  });
}

export function saveArticle(article) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const alreadySaved = savedArticles.find(
        (saved) => saved.link === article.url
      );

      if (alreadySaved) {
        reject(new Error("Article is already saved"));
        return;
      }

      const savedArticle = {
        _id: `65f73${Math.random().toString(36).substr(2, 9)}`,
        title: article.title,
        text: article.description || article.text,
        date: article.publishedAt || article.date,
        source: article.source?.name || article.source,
        link: article.url,
        image: article.urlToImage || article.image,
        keyword: article.keyword || "search", // Default keyword
      };

      // Add to saved articles array
      savedArticles.push(savedArticle);

      resolve(savedArticle);
    }, 800);
  });
}

export function deleteArticle(articleOrId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!articleOrId) {
        reject(new Error("Article ID or object is required"));
        return;
      }

      const initialLength = savedArticles.length;

      if (typeof articleOrId === "object") {
        const articleUrl = articleOrId.link || articleOrId.url;
        savedArticles = savedArticles.filter(
          (article) => article.link !== articleUrl
        );
      } else {
        savedArticles = savedArticles.filter(
          (article) => article._id !== articleOrId
        );
      }

      if (savedArticles.length === initialLength) {
        reject(new Error("Article not found"));
        return;
      }

      resolve({ message: "Article deleted successfully" });
    }, 600);
  });
}

export function checkIfSaved(articleUrl) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isSaved = savedArticles.some(
        (article) => article.link === articleUrl
      );
      resolve({ isSaved });
    }, 300);
  });
}
