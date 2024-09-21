import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';

// Mock data for different subjects
const subjects = [
    { name: 'Math', attended: 25, unattended: 5 },
    { name: 'Physics', attended: 22, unattended: 8 },
    { name: 'Chemistry', attended: 27, unattended: 3 },
    { name: 'Biology', attended: 28, unattended: 2 },
    { name: 'English', attended: 20, unattended: 10 },
    { name: 'History', attended: 18, unattended: 12 },
];

// Colors for attended portion (unattended will be white)
const COLORS = [
    ['#0088FE', '#f7f7f7'], // Math
    ['#FFBB28', '#f7f7f7'], // Physics
    ['#FF6384', '#f7f7f7'], // Chemistry
    ['#4BC0C0', '#f7f7f7'], // Biology
    ['#9966FF', '#f7f7f7'], // English
    ['#66FF66', '#f7f7f7'], // History
];

export default class AttendanceChart extends PureComponent {
    renderPieChart = (subject, index) => (
        <div key={index} style={styles.chartContainer}>
            <PieChart width={200} height={200}>
                <Pie
                    data={[
                        { name: 'Attended', value: subject.attended },
                        { name: 'Unattended', value: subject.unattended },
                    ]}
                    cx={100}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {[
                        { name: 'Attended', value: subject.attended },
                        { name: 'Unattended', value: subject.unattended },
                    ].map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[index][idx % COLORS[index].length]} />
                    ))}
                    <Label
                        value={`Attended: ${subject.attended}`}
                        position="center"
                        style={{ fontSize: '14px', fill: '#000' }}
                    />
                </Pie>
            </PieChart>
            <p style={styles.subjectLabel}>{subject.name}</p> {/* Subject label */}
        </div>
    );

    render() {
        return (
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Attendance Summary</h3>
                <div style={styles.chartWrapper}>
                    {subjects.map((subject, index) => this.renderPieChart(subject, index))}
                </div>
            </div>
        );
    }
}

// Simple card styles
const styles = {
    card: {
        width: '100%',
        height: '100%',
        // margin: '0.1rem',
        // padding: '0.1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundImage: 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
        overflowX: 'auto', // Add horizontal scroll
    },
    cardTitle: {
        marginBottom: '20px',
        fontSize: '1.5em',
        color: '#333',
        textAlign: 'center',
    },
    chartWrapper: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll', // Enable horizontal scroll
        paddingBottom: '1rem',
    },
    chartContainer: {
        flex: '0 0 auto', // Prevent charts from shrinking
        // margin: '0 1rem', // Add space between charts
        textAlign: 'center',
    },
    subjectLabel: {
        margin: '10px',
        fontSize: '1.1em',
        color: '#333',
    },
};
