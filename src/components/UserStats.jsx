import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../apiService';
import StatBlock from './StatBlock';
import SlideUp from '../assets/images/Slide up.png';
import RatingGraph from './RatingGraph';

const UserStats = props => {
    const { name } = useParams();
    const [userProfileStats, setUserProfileStats] = useState({
        chess_rapid: {
            last: {
                rating: 1200
            },
            record: {
                win: 0, loss: 0, draw: 0
            }
        },
        tactics: {
            highest: { rating: 800 }, lowest: { rating: 800 }
        },
        puzzle_rush: {
            best: { score: 0 }
        }
    });
    const [userProfileDetails, setUserProfileDetails] = useState({
        name: 'John Doe',
        country: 'IN'
    });
    const [timestamps, setTimestamps] = useState();
    const [ratings, setRatings] = useState();

    var rapid = userProfileStats.chess_rapid;

    useEffect(() => {
        ApiService.getDataForUser(name, (userStats, userDetails) => {
            setUserProfileStats(userStats[0]);
            setUserProfileDetails(userDetails[0]);
        });
        ApiService.getRatingGraph(name, 'rapid', 30, (userTimeStamps, ratingChart) => {
            setTimestamps(userTimeStamps)
            setRatings(ratingChart)
        })
    }, []);

    return <div className="user-stats">
        <div className="user-stats__introduction">
            <img src={userProfileDetails.avatar}/>
            <div className="user-stats__intro-text">
                <p className="user-stats__username">{name}</p>
                <img
                    src={`https://flagcdn.com/${userProfileDetails.country.slice(-2).toLowerCase()}.svg`}
                    width="30"
                    alt="India" />
                <p className="user-stats__real-name">{userProfileDetails.name}</p>
                <p>Hyderabad, India</p>
                <p>Joined on 25 Jan, 2022</p>
            </div>
        </div>
        <div className="stat-blocks">
            <StatBlock title="Rating" value={rapid.last.rating}>
                <div className="stat-block__rating-description">
                    <img src={SlideUp} alt="increasing"/>
                    <span>88</span>
                </div>
            </StatBlock>
            <StatBlock title="Games played" value={rapid.record.win + rapid.record.loss + rapid.record.draw} />
            <StatBlock title="Accuracy" value={69.5}>
                <p className="stat-block__description">120 games analyzed</p>
            </StatBlock>
            <StatBlock title="Percentile" value={'90.4%'} />
            <StatBlock title="Best puzzle rush" value={userProfileStats.puzzle_rush.best.score} />
            <StatBlock title="Highest puzzle rating" value={userProfileStats.tactics.highest.rating} />
        </div>
        <RatingGraph ratings={ratings} timestamps={timestamps} />
        <h2>Win rate</h2>
        <div className="win-loss-bar" style={{ background: 'linear-gradient(to right, #76D767 0%, #76D767 72%, white 72%, white 75%, #FF4848 75%, #FF4848 100%)', width: '30rem' }}></div>
        <h2>Puzzles</h2>
        <div className="stat-blocks">
            <StatBlock title="Rating" value={2241} />
            <StatBlock title="Highest Rating" value={2400} />
            <StatBlock title="Rated Training" value={'11 hrs'}>
                <p className="stat-block__description">36 minutes</p>
            </StatBlock>
            <StatBlock title="Rated Puzzles" value={'1,031'} />
            <StatBlock title="Accuracy" value={'59%'} />
        </div>
    </div>;
}
 
export default UserStats;