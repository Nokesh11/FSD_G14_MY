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
};
