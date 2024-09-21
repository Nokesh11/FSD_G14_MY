import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';

// Mock data for the chart
const total = 30;
const unattended = 5;
const data = [
    { name: 'Attended', value: total - unattended },
    { name: 'Unattended', value: unattended },
];
const COLORS = ['#0088FE', '#00C49F'];

export default class AttendanceChart extends PureComponent {
    render() {
        return (
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Attendance Summary</h3>
                <PieChart width={800} height={400}>
                    <Pie
                        data={data}
                        cx={120}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        {/* Display label inside the pie */}
                        <Label
                            value={`Attended: ${total - unattended}`}
                            position="center"
                            style={{ fontSize: '14px', fill: '#000' }}
                        />
                    </Pie>
                    <Pie
                        data={data}
                        cx={420}
                        cy={200}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        {/* Display label inside the pie */}
                        <Label
                            value={`Attended: ${total - unattended}`}
                            position="center"
                            style={{ fontSize: '14px', fill: '#000' }}
                        />
                    </Pie>
                </PieChart>
            </div>
        );
    }
}

// Simple card styles
const styles = {
    card: {
        width: '40%',
        margin: '4rem auto',
        padding: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundImage: { 'light-gradient': 'linear-gradient(to bottom, #ffffff, #f0f0f0)' },
        textAlign: 'center',
    },
    cardTitle: {
        marginBottom: '20px',
        fontSize: '1.5em',
        color: '#333',
    },
    // };
    // import GaugeComponent from 'react-gauge-component';


    // // class AttendanceChart extends PureComponent {
    // //     render() {
    // //         return (
    // //             <GaugeComponent
    // //                 type="radial"  // Use the appropriate type from your documentation, e.g., "radial"
    // //                 value={75}
    // //                 minValue={0}
    // //                 maxValue={100}
    // //                 startAngle={-180}
    // //                 endAngle={180}
    // //                 arc={{
    // //                     cornerRadius: 7,
    // //                     padding: 0.05,
    // //                     width: 0.2, // Adjust the width of the arc
    // //                     colorArray: ["#5BE12C", "#F5CD19", "#EA4228"], // Customize the colors
    // //                     subArcs: [
    // //                         { limit: 33, color: "#5BE12C" },
    // //                         { limit: 66, color: "#F5CD19" },
    // //                         { color: "#EA4228" }
    // //                     ],
    // //                     animate: true,  // Enabling arc animation
    // //                 }}
    // //                 pointer={{
    // //                     hide: true, // Hides the needle
    // //                 }}
    // //                 labels={{
    // //                     valueLabel: {
    // //                         formatTextValue: value => `${value} / 100`,
    // //                         style: { fontSize: '35px', fill: '#fff', textShadow: 'black 1px 1px 0px' },
    // //                     },
    // //                 }}
    // //                 style={{ width: 300, height: 300 }}  // Adjust the size of the gauge as needed
    // //                 animationDuration={3000}  // Duration for the sub-arcs animation
    // //                 animationDelay={100}      // Delay for starting the animation
    // //             />
    // //         );
    // //     };
    // // }

    // // export default AttendanceChart;
    // // import React from 'react';
    // // import { Doughnut } from 'react-chartjs-2';

    // // const data = {
    // //     datasets: [
    // //         {
    // //             data: [70, 30], // 70% progress
    // //             backgroundColor: ['#4caf50', '#e0e0e0'],
    // //         },
    // //     ],
    // // };

    // // const options = {
    // //     cutout: '80%', // Hollow center like LeetCode profile meters
    // //     rotation: -90,
    // //     circumference: 180, // Semi-circle
    // // };

    // // function AttendanceChart() {
    // //     return <Doughnut data={data} options={options} />;
    // // }

    // // export default AttendanceChart;


    // const AttendanceChart = () => {
    //     return (
    //         <GaugeComponent
    //             type="radial"  // Radial to mimic LeetCode’s circular gauge
    //             value={75}     // The value to be displayed, e.g., progress
    //             minValue={0}
    //             maxValue={100}
    //             startAngle={0}   // Start angle for LeetCode style
    //             endAngle={180}      // End angle for LeetCode style
    //             arc={{
    //                 cornerRadius: 10,  // Rounded corners for smoother look
    //                 padding: 0.02,     // Small padding between the arcs
    //                 width: 0.2,        // Adjust arc width
    //                 gradient: true,    // Use gradient to fill smoothly
    //                 colorArray: ["#00C49F", "#FFBB28", "#FF8042"], // Similar to LeetCode's green-to-orange progression
    //                 animate: true,     // Enable smooth animation
    //             }}
    //             pointer={{
    //                 hide: true, // Hides the pointer
    //             }}
    //             labels={{
    //                 valueLabel: {
    //                     formatTextValue: value => `${value}%`, // Percentage label
    //                     style: { fontSize: '30px', fill: '#333', fontWeight: 'bold' },  // Center label style
    //                     matchColorWithArc: true,  // Match the label color with the arc
    //                 },
    //             }}
    //             style={{ width: 300, height: 300 }}  // Size similar to LeetCode progress ring
    //             animationDuration={2000}  // Smooth animation duration
    //             animationDelay={100}      // Slight delay before animation starts
    //         />
    //     );
    // };
    // export default AttendanceChart;
}