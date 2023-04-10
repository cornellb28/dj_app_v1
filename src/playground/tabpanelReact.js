import React, { useState } from 'react';

const TabPanel = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <div className="tab-list">
        <button className={activeTab === 0 ? "active" : ""} onClick={() => handleTabClick(0)}>Tab 1</button>
        <button className={activeTab === 1 ? "active" : ""} onClick={() => handleTabClick(1)}>Tab 2</button>
        <button className={activeTab === 2 ? "active" : ""} onClick={() => handleTabClick(2)}>Tab 3</button>
      </div>
      {activeTab === 0 && (
        <div className="tab-content">
          <h2>Tab 1 Content</h2>
          <p>This is the content of tab 1.</p>
        </div>
      )}
      {activeTab === 1 && (
        <div className="tab-content">
          <h2>Tab 2 Content</h2>
          <p>This is the content of tab 2.</p>
        </div>
      )}
      {activeTab === 2 && (
        <div className="tab-content">
          <h2>Tab 3 Content</h2>
          <p>This is the content of tab 3.</p>
        </div>
      )}
    </div>
  );
};

export default TabPanel;
