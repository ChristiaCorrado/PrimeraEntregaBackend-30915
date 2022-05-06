const getTime = () => {
    return {
      fyh: new Date().toLocaleString(),
      timestamp: Date.now(),
    };
    
};

module.exports = getTime;