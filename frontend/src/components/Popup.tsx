import { useEffect, useState } from 'react';
import axios from 'axios';

function Popup() {
  const [tabs, setTabs] = useState([]);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   chrome.identity.getAuthToken({ interactive: true }, async (token) => {
  //     const res = await axios.post('http://localhost:5000/api/users/google-login', { token });
  //     setUser(res.data);
  //   });
  // }, []);

  const saveTabs = async () => {
    chrome.tabs.query({}, async (tabList) => {
      const simplifiedTabs = tabList.map(tab => ({ title: tab.title, url: tab.url }));


      console.log(simplifiedTabs);
      
      // await axios.post('http://localhost:5000/api/tabs/save', {
      //   googleId: (user as any)?.googleId,
      //   tabs: simplifiedTabs,
      // });
    });
  };

  return (
    <div>
      <h3>Welcome {(user as any)?.name}</h3>
      <button onClick={saveTabs}>Save Tabs</button>
    </div>
  );
}

export default Popup;
