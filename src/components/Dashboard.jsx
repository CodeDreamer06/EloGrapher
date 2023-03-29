import { useState } from 'react'
import HorizontalBarGraph from './HorizontalBarGraph';
import { useNavigate } from 'react-router-dom';
import TabSwitcher from './TabSwitcher';

const Dashboard = ({ userProfileStats, usernames }) => {
    const timeControls = ['Puzzles', 'Daily', 'Bullet', 'Blitz', 'Rapid'];
    const [selectedTab, setSelectedTab] = useState(timeControls.length - 1);
    const navigate = useNavigate();

    const categories = Object.freeze({
        0: "tactics",
        1: "chess_daily",
        2: "chess_bullet",
        3: "chess_blitz",
        4: "chess_rapid"
    });

    const handleTabClick = i => {
        if (i != selectedTab) setSelectedTab(i);
    }

    const getUserChartData = userProfile => {
        const current = categories[selectedTab];
        return selectedTab == 0 ? userProfile?.[current].highest.rating : userProfile?.[current].last.rating;
    }

    return <div>
        <div className="stats">
            <TabSwitcher tabs={timeControls} selectedTab={selectedTab} handleTabClick={handleTabClick} />
            <HorizontalBarGraph data={userProfileStats.map(getUserChartData)} labels={usernames} handleOnClick={i => navigate(`/user/${usernames[i]}`)}/>
        </div>
    </div>
}
 
export default Dashboard;