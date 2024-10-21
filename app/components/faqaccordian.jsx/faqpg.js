import React, { useState } from 'react';
import './FAQAccordion.css'; 

const FAQAccordion = ({ faqs }) => {
    
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        // If the clicked index is already active, collapse it, otherwise open it
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="accordion-container">
            {faqs.map((faq, index) => (
                <div className="accordion" key={index}>
                    <div className="icon" onClick={() => handleToggle(index)}>
                        {activeIndex === index ? '-' : '+'} {/* Toggle icon */}
                    </div>
                    <div className="question" onClick={() => handleToggle(index)}>
                        {faq.question}
                    </div>
                    <div className="answer" style={{ maxHeight: activeIndex === index ? `${faq.answer.length * 2}rem` : '0' }}>
                        {faq.answer}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQAccordion;
