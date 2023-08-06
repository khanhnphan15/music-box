import React from "react";
import './PlayingSpinner.css'; // Import the CSS file

export default function PlayingSpinner({handleAddPost}) {
    return (
        <svg className='music-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 512">
            {/* Add 'music-bars' class to the SVG elements to apply the animation */}
            <rect width="32" height="192" x="16" y="10"
                  fill="var(--ci-primary-color, #000000)" className="ci-primary music-bar1"/>
            <rect width="32" height="328" x="104" y="10"
                  fill="var(--ci-primary-color, #000000)" className="ci-primary music-bar2"/>
            <rect width="32" height="480" x="192" y="10"
                  fill="var(--ci-primary-color, #000000)" className="ci-primary music-bar3"/>
            <rect width="32" height="320" x="288" y="10"
                  fill="var(--ci-primary-color, #000000)" className="ci-primary music-bar4"/>
        </svg>
    );
}
