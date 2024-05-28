import React from 'react'

const Button = ({children, link, onclick,  disabled}) => {
    return (
        <div>
            {/*You can either use href link using 'link' or onclick using 'onclick' whenver you're using the button props*/}
            <button onClick={onclick}  disabled={disabled}>
                <a href={link} className="block py-3 px-4 font-medium text-center text-black bg-yellow  rounded-xl shadow-2xl shadow-yellow/30 hover:shadow-yellow/50">
                    {children}
                </a>
            </button>
        </div>
    )
}

export default Button