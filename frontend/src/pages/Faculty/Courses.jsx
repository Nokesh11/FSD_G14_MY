// src/components/Courses.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../stylesheets/courses.css';

const Courses = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const navigate = useNavigate();

    const items = [
        { id: 1, title: 'CA' },
        { id: 2, title: 'FDFED' },
        { id: 3, title: 'CP' },
        { id: 4, title: 'OCW' },
        { id: 5, title: 'FDFSD' },
        { id: 6, title: 'WBD' },
        { id: 7, title: 'BTA' },
    ];

    const handleMenuClick = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    const handleMenuAction = (action, item) => {
        setActiveMenu(null);

        // Handle navigation based on the action clicked
        switch (action) {
            case 'Attendance':
                navigate(`/view/${item.id}`);
                break;
            case 'Assignment Marks':
                navigate(`/edit/${item.id}`);
                break;
            case 'Exam Marks':
                navigate(`/delete/${item.id}`);
                break;
            case 'Quiz Marks':
                navigate(`/delete/${item.id}`);
                break;
            default:
                break;
        }
    };

    return (
        <div className="list-container">
            <ul className="list">
                {items.map((item) => (
                    <li key={item.id} id="list-item">
                        <div><span className="item-title">{item.title}</span></div>

                        {/* Three-dot menu button */}
                        <span className="menu-icon" onClick={() => handleMenuClick(item.id)}>
                            ⋮
                        </span>
                        {/* Dropdown menu */}
                        {activeMenu === item.id && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li onClick={() => handleMenuAction('Attendance', item)}>Attendance</li>
                                    <li onClick={() => handleMenuAction('Quiz Marks', item)}>Quiz Marks</li>
                                    <li onClick={() => handleMenuAction('Assignment Marks', item)}>Assignment Marks</li>
                                    <li onClick={() => handleMenuAction('Exam Marks', item)}>Exam Marks</li>
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Courses;
