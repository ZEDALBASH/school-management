function numCounter (numItem) {
    
    const results = numItem;
    try {
      let parseResults = JSON.parse(results);
  
      if (!parseResults || !Array.isArray(parseResults) || !parseResults.length) {
        throw new Error("is not array");
      }

      return Math.max(...parseResults.map((item) => item.Num));
    } catch (err) {
      console.log(err);
      return 0;
    }
}