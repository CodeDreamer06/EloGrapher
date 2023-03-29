const StatBlock = ({ title, value, children }) => {
    return <div className="stat-block">
        <p className="stat-block__title">{title}</p>
        <p className="stat-block__value">{value}</p>
        {children}
    </div>;
}
 
export default StatBlock;