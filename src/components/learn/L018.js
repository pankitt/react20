import React, {Component} from 'react';

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}


function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}
class TemperatureInput extends Component {
    handleChange = (e) => {
        this.props.onTemperatureChange(e.target.value);
    };

    render() {
        const {temperature, scale} = this.props;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                       onChange={this.handleChange} />
            </fieldset>
        );
    }
}



class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange = (temperature) => {
        this.setState({scale: 'c', temperature});
    };

    handleFahrenheitChange = (temperature) => {
        this.setState({scale: 'f', temperature});
    };

    render() {
        const {scale, temperature} = this.state;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />

                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />

                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}


class NewClass extends Component {
    render() {
        return (
            <div>
                <Calculator />
            </div>
        );
    }
}

export default NewClass;
