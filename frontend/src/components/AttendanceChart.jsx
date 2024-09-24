import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Mock data for different subjects
const subjects = [
    { name: 'FDFED', attended: 25, unattended: 5 },
    { name: 'ICS', attended: 22, unattended: 8 },
    { name: 'BTA', attended: 27, unattended: 3 },
    { name: 'NLP', attended: 28, unattended: 2 },
    { name: 'CGM', attended: 20, unattended: 10 },
    { name: 'IDA', attended: 18, unattended: 12 },
];

// Colors for attended portion (unattended will be white)
const COLORS = [
    ['#0088FE', '#f7f7f7'], // FDFED
    ['#FFBB28', '#f7f7f7'], // ICS
    ['#FF6384', '#f7f7f7'], // BTA
    ['#4BC0C0', '#f7f7f7'], // NLP
    ['#9966FF', '#f7f7f7'], // CGM
    ['#66FF66', '#f7f7f7'], // IDA
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
        // Slick slider settings
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3, // Show 3 charts at once
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1, // Show 1 chart at once for small screens
                        slidesToScroll: 1,
                    },
                },
            ],
        };

        return (
            <div style={styles.card}>
                <Slider {...settings}>
                    {subjects.map((subject, index) => this.renderPieChart(subject, index))}
                </Slider>
            </div>
        );
    }
}

// Simple card styles
const styles = {
    card: {
        width: '100%',
        height: '100%',
        // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        // backgroundImage: 'linear-gradient(to bottom, #904dd3, #6d28d9)',
        padding: '1rem',
        color: "#ffffff"
    },
    chartContainer: {
        textAlign: 'center',
        padding: '0 1rem',
    },
    subjectLabel: {
        margin: '10px 0',
        fontSize: '1.1em',
        color: '#333',
        textAlign: 'center',
    },
};
