const TabSwitcher = ({ tabs, selectedTab, handleTabClick }) => {
    return <div>
        {tabs.map((tab, i) => <span key={i} className={selectedTab == i ? "tab tab--selected" : "tab"} onClick={() => handleTabClick(i)}>{tab}</span>)}
    </div>;
}
 
export default TabSwitcher;