export const mockNewsApiResponse = {
  status: "ok",
  totalResults: 12,
  articles: [
    {
      source: {
        id: "treehugger",
        name: "TreeHugger",
      },
      author: "Melissa Breyer",
      title: "Everyone Needs a Special 'Sit Spot' in Nature",
      description:
        "Ever since I read Richard Louv's influential book 'Last Child in the Woods,' the idea of having a special 'sit spot' has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find a place in nature where they can sit quietly and observe.",
      url: "https://www.treehugger.com/sit-spot-nature-4858336",
      urlToImage: null,
      publishedAt: "2020-11-04T10:30:00Z",
      content:
        "Ever since I read Richard Louv's influential book 'Last Child in the Woods,' the idea of having a special 'sit spot' has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find a place in nature where they can sit quietly and observe the natural world around them.",
    },
    {
      source: {
        id: "national-geographic",
        name: "National Geographic",
      },
      author: "Florence Williams",
      title: "Nature makes you better",
      description:
        "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves. Research is now catching up with our intuition about nature's benefits.",
      url: "https://www.nationalgeographic.com/magazine/2016/01/call-to-wild/",
      urlToImage: null,
      publishedAt: "2019-02-19T14:20:00Z",
      content:
        "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves. Now research is catching up with our intuition about nature's restorative powers.",
    },
    {
      source: {
        id: "national-parks-traveler",
        name: "National Parks Traveler",
      },
      author: "Kurt Repanshek",
      title: "Grand Teton Renews Historic Crest Trail",
      description:
        "The linking together of the Cascade Canyon and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be able to make a complete circuit of the Teton Range.",
      url: "https://www.nationalparkstraveler.org/2020/10/grand-teton-renews-historic-crest-trail",
      urlToImage: null,
      publishedAt: "2020-10-19T16:45:00Z",
      content:
        "The linking together of the Cascade Canyon and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be able to make a complete circuit of the Teton Range.",
    },
    {
      source: {
        id: "bbc-news",
        name: "BBC News",
      },
      author: "David Shukman",
      title: "Climate Change Affects Wildlife Migration Patterns",
      description:
        "New research shows how rising temperatures are fundamentally altering the ancient migration routes of birds and mammals across the globe, with potentially devastating consequences for ecosystems.",
      url: "https://www.bbc.com/news/science-environment-58945678",
      urlToImage: null,
      publishedAt: "2023-03-15T09:15:00Z",
      content:
        "New research published today reveals the extent to which climate change is disrupting wildlife migration patterns that have remained stable for thousands of years. Scientists warn that these changes could have cascading effects on global ecosystems.",
    },
    {
      source: {
        id: "the-guardian",
        name: "The Guardian",
      },
      author: "George Monbiot",
      title: "Rewilding: The Radical New Approach to Conservation",
      description:
        "How letting nature take its course is proving more effective than traditional conservation methods in protecting biodiversity and restoring ecosystems to their natural state.",
      url: "https://www.theguardian.com/environment/2023/rewilding-conservation",
      urlToImage: null,
      publishedAt: "2023-06-22T11:30:00Z",
      content:
        "Rewilding represents a paradigm shift in conservation thinking, moving away from intensive management towards allowing natural processes to restore and maintain ecosystems. This approach is showing remarkable success across various landscapes.",
    },
    {
      source: {
        id: "scientific-american",
        name: "Scientific American",
      },
      author: "Suzanne Simard",
      title: "The Intelligence of Trees: New Forest Research",
      description:
        "Scientists discover sophisticated communication networks in forest ecosystems that challenge our understanding of plant intelligence and cooperation in nature.",
      url: "https://www.scientificamerican.com/article/tree-intelligence-forest-networks/",
      urlToImage: null,
      publishedAt: "2023-08-10T13:45:00Z",
      content:
        "Deep in the forest, beneath our feet, a vast communication network operates through fungal connections that link trees together. This 'wood wide web' allows forests to share resources and information in ways that are revolutionizing our understanding of plant intelligence.",
    },
    {
      source: {
        id: "reuters",
        name: "Reuters",
      },
      author: "Gloria Dickie",
      title: "Ocean Plastic Pollution Reaches Record Levels",
      description:
        "Marine biologists report unprecedented amounts of plastic waste in ocean ecosystems, threatening marine life and coastal communities worldwide.",
      url: "https://www.reuters.com/business/environment/ocean-plastic-pollution-record-levels-2023-09-05/",
      urlToImage: null,
      publishedAt: "2023-09-05T08:20:00Z",
      content:
        "The amount of plastic pollution in the world's oceans has reached record levels, according to new research from marine biologists. The study found microplastics in every ocean sample tested, from surface waters to the deepest trenches.",
    },
    {
      source: {
        id: "nature",
        name: "Nature",
      },
      author: "Dr. Jane Chen",
      title: "Breakthrough in Renewable Energy Storage",
      description:
        "Researchers develop new battery technology that could revolutionize renewable energy storage, making solar and wind power more reliable and efficient.",
      url: "https://www.nature.com/articles/renewable-energy-storage-breakthrough-2023",
      urlToImage: null,
      publishedAt: "2023-10-12T14:00:00Z",
      content:
        "A team of researchers has developed a new type of battery that can store renewable energy more efficiently than existing technologies. This breakthrough could accelerate the transition to clean energy by solving the intermittency problem of solar and wind power.",
    },
    {
      source: {
        id: "associated-press",
        name: "Associated Press",
      },
      author: "Seth Borenstein",
      title: "Arctic Ice Melt Accelerates Despite Climate Efforts",
      description:
        "New satellite data shows Arctic ice is melting faster than previously predicted, raising concerns about sea level rise and global weather patterns.",
      url: "https://apnews.com/article/arctic-ice-melt-climate-change-satellites",
      urlToImage: null,
      publishedAt: "2023-11-18T12:30:00Z",
      content:
        "Arctic sea ice is disappearing at an accelerating rate, according to new satellite measurements. The data shows that ice loss is outpacing even the most pessimistic climate models, with implications for global sea levels and weather systems.",
    },
  ],
};

export const transformArticleData = (apiResponse) => {
  return apiResponse.articles.map((article, index) => ({
    id: index + 1,
    title: article.title,
    description: article.description,
    source: article.source.name.toUpperCase(),
    date: new Date(article.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    imageUrl: article.urlToImage || "",
    url: article.url,
    author: article.author,
    publishedAt: article.publishedAt,
    content: article.content,
  }));
};

export const fetchMockNewsData = (searchQuery = "", delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredResponse = {
        ...mockNewsApiResponse,
        searchQuery,
        articles: mockNewsApiResponse.articles.slice(0, 6),
      };
      resolve(filteredResponse);
    }, delay);
  });
};
