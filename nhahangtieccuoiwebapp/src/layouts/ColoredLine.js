const ColoredLine = ({ color }) => (
    <hr style={{ 
        color, 
        backgroundColor: color, 
        width: "10%", 
        marginLeft: "auto", 
        marginRight: "auto", 
        opacity: 1, 
        height: "2px" }}
    />
)

export default ColoredLine