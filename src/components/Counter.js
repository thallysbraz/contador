import React, { useState } from 'react';
import './Counter.css';

export default function Counter() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1)
    }
    function decrement() {
        setCount(count - 1)
    }

    function reset() {
        setCount(0);
    }

    return (
        <div className='counter'>
            <h2>Contador</h2>
            <p className='counter__value'>{count}</p>

            <div className='counter__buttons'>
                <button onClick={decrement}>-</button>
                <button onClick={reset}>
                    Resetar
                </button>
                <button onClick={increment}>+</button>

            </div>
        </div>
    );
}
