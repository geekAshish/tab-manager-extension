import { useEffect, useState } from 'react';
import axios from 'axios';

function Popup() {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | null>(null);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   chrome.identity.getAuthToken({ interactive: true }, async (token) => {
  //     const res = await axios.post('http://localhost:5000/api/users/google-login', { token });
  //     setUser(res.data);
  //   });
  // }, []);


  function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, ([tab]) => {
      if (chrome.runtime.lastError)
      console.error(chrome.runtime.lastError);
      // `tab` will either be a `tabs.Tab` instance or `undefined`.
      setCurrentTab(tab);
    });
  }

  const saveTabs = async () => {
    chrome.tabs.query({}, async (tabList) => {
      const simplifiedTabs = tabList.map(tab => ({ title: tab.title, url: tab.url }));

      console.log(tabList);
      setTabs(tabList)
      
      // await axios.post('http://localhost:5000/api/tabs/save', {
      //   googleId: (user as any)?.googleId,
      //   tabs: simplifiedTabs,
      // });
    });
  };

  const createTab = async () => {
    await chrome.tabs.create({})
  }

  const discardTab = async (tabId: number | undefined) => { 
    await chrome.tabs.discard(tabId)
  }

  async function updateMutedInfo(tabId: number | undefined, isMuted : boolean) {
    await chrome.tabs.update(tabId, {muted: isMuted});
  }

  async function toggleMuteState(tabId: number) {
    const tab = await chrome.tabs.get(tabId);
    const muted = !tab.mutedInfo!.muted;
    updateMutedInfo(tabId, muted);
    console.log(`Tab ${tab.id} is ${muted ? "muted" : "unmuted"}`);
  }

  // chrome.tabs.onActivated.addListener(moveToFirstPosition);
  async function moveToFirstPosition(tabId: any) {
    try {
      await chrome.tabs.move(tabId, {index: 0});
      console.log("Success.");
    } catch (error) {
      if (error == "Error: Tabs cannot be edited right now (user may be dragging a tab).") {
        setTimeout(() => moveToFirstPosition(tabId), 50);
      } else {
        console.error(error);
      }
    }
  }

  const somethingfunction = (tabId: any) => {
    console.log(chrome.tabs.remove(tabId));
  }

  useEffect(() => {
    getCurrentTab()
  }, [])


  return (
    <div>
      <h3>Welcome {(user as any)?.name}</h3>
      <button onClick={saveTabs}>get all Tabs</button>
      <button onClick={createTab}>create new Tab</button>


      <div>this is your current tab: {currentTab?.title}</div>

      <div>
        {
          tabs.map((tab, i) => {
            return <div key={i}>
                <p>{tab.title}</p>
                <button onClick={() => somethingfunction(tab.id)}>lkasj;ldkfj</button>
                <button onClick={() => discardTab(tab.id)}>discard this tab</button>
                <button onClick={() => moveToFirstPosition(tab.id)}>
                  move to first
                </button>
              </div>
          })
        }
      </div>
    </div>
  );
}

export default Popup;
