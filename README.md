# FinTwin - AI-Powered Financial Health Predictor

FinTwin is a web application that uses artificial intelligence to predict financial health and simulate different financial scenarios. It helps users make informed financial decisions by providing personalized insights and recommendations.

## Features

- **Financial Health Analysis**: Get a comprehensive analysis of your financial health with AI-powered insights
- **Financial Projections**: View 6-12 month projections of your financial situation
- **Simulation Playground**: Experiment with different financial scenarios (expense reduction, income increase, loans, investments)
- **Personalized Recommendations**: Receive AI-generated recommendations based on your financial situation
- **Interactive Visualizations**: Beautiful charts and graphs to understand your financial data

## Installation

1. Clone the repository:
```bash
git clone https://github.com/quantumKeyboard/805DevKraft.git
cd 805DevKraft
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory with your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

## Usage

1. Start the Streamlit application:
```bash
streamlit run app.py
```

2. Open your web browser and navigate to `http://localhost:8501`

3. Follow the on-screen instructions to:
   - Input your financial data
   - View your financial health analysis
   - Run simulations
   - Get personalized recommendations

## Project Structure

- `app.py`: Main Streamlit application
- `financial_ai.py`: AI-powered financial analysis and predictions
- `data_processor.py`: Data processing and visualization
- `requirements.txt`: Project dependencies

## Technologies Used

- Streamlit: Web application framework
- OpenAI GPT: AI-powered analysis and recommendations
- Prophet: Time series forecasting
- Plotly: Interactive visualizations
- scikit-learn: Machine learning models
- pandas: Data manipulation
- numpy: Numerical computations

## Security

This application uses environment variables for sensitive information like API keys. Never commit your `.env` file or expose your API keys in the code.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 