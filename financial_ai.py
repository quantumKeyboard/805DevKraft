import pandas as pd
import numpy as np
from prophet import Prophet
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import openai
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

class FinancialAI:
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        if not self.openai_api_key:
            raise ValueError("OpenAI API key not found in environment variables. Please set OPENAI_API_KEY in your .env file.")
        openai.api_key = self.openai_api_key
        self.scaler = StandardScaler()
        self.risk_model = RandomForestRegressor()
        self.health_model = RandomForestRegressor()
        self._initialize_models()

    def _initialize_models(self):
        # Initialize models with default parameters
        self.risk_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.health_model = RandomForestRegressor(n_estimators=100, random_state=42)

    def analyze_financial_health(self, user_data):
        """Analyze user's financial health and generate predictions."""
        # Prepare data for analysis
        features = self._prepare_features(user_data)
        
        # Generate predictions
        health_score = self._predict_health_score(features)
        risk_level = self._predict_risk_level(features)
        savings_projection = self._project_savings(user_data)
        
        # Generate AI analysis
        analysis = self._generate_ai_analysis(user_data, health_score, risk_level, savings_projection)
        
        return {
            "health_score": health_score,
            "health_score_change": self._calculate_change(health_score, 50),  # Base score of 50
            "risk_level": risk_level,
            "risk_change": self._calculate_risk_change(risk_level),
            "savings_projection": savings_projection,
            "savings_change": self._calculate_change(savings_projection, user_data["savings"]),
            "analysis": analysis,
            "projections": self._generate_detailed_projections(user_data)
        }

    def _prepare_features(self, user_data):
        """Prepare features for model prediction."""
        total_expenses = sum(user_data["expenses"].values())
        savings_rate = (user_data["income"] - total_expenses) / user_data["income"]
        debt_to_income = user_data["debt"] / user_data["income"] if user_data["income"] > 0 else 0
        
        features = {
            "income": user_data["income"],
            "total_expenses": total_expenses,
            "savings_rate": savings_rate,
            "debt_to_income": debt_to_income,
            "savings": user_data["savings"],
            "debt": user_data["debt"]
        }
        
        return pd.DataFrame([features])

    def _predict_health_score(self, features):
        """Predict financial health score (0-100)."""
        # In a real implementation, this would use a trained model
        # For now, using a simple heuristic
        savings_rate = features["savings_rate"].iloc[0]
        debt_to_income = features["debt_to_income"].iloc[0]
        
        base_score = 50
        savings_impact = savings_rate * 30  # Up to 30 points for savings
        debt_impact = -min(debt_to_income * 20, 30)  # Up to -30 points for debt
        
        score = base_score + savings_impact + debt_impact
        return max(0, min(100, score))

    def _predict_risk_level(self, features):
        """Predict financial risk level."""
        # In a real implementation, this would use a trained model
        # For now, using a simple heuristic
        savings_rate = features["savings_rate"].iloc[0]
        debt_to_income = features["debt_to_income"].iloc[0]
        
        if savings_rate < 0.1 or debt_to_income > 0.4:
            return "High"
        elif savings_rate < 0.2 or debt_to_income > 0.2:
            return "Medium"
        else:
            return "Low"

    def _project_savings(self, user_data):
        """Project future savings using Prophet."""
        # Create historical data
        dates = pd.date_range(start='2020-01-01', end=datetime.now(), freq='M')
        savings_data = pd.DataFrame({
            'ds': dates,
            'y': np.linspace(0, user_data["savings"], len(dates))
        })
        
        # Fit Prophet model
        model = Prophet()
        model.fit(savings_data)
        
        # Make future predictions
        future = model.make_future_dataframe(periods=12, freq='M')
        forecast = model.predict(future)
        
        return forecast['yhat'].iloc[-1]

    def _generate_ai_analysis(self, user_data, health_score, risk_level, savings_projection):
        """Generate AI-powered analysis using OpenAI."""
        prompt = f"""
        Analyze this financial situation:
        - Monthly Income: ${user_data['income']:,.2f}
        - Monthly Expenses: ${sum(user_data['expenses'].values()):,.2f}
        - Current Savings: ${user_data['savings']:,.2f}
        - Current Debt: ${user_data['debt']:,.2f}
        - Health Score: {health_score}%
        - Risk Level: {risk_level}
        - Projected Savings in 1 year: ${savings_projection:,.2f}

        Provide a detailed analysis focusing on:
        1. Overall financial health
        2. Key strengths and weaknesses
        3. Potential risks and opportunities
        4. Specific recommendations for improvement
        """
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a financial advisor providing detailed analysis and recommendations."},
                    {"role": "user", "content": prompt}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error generating AI analysis: {str(e)}"

    def _generate_detailed_projections(self, user_data):
        """Generate detailed financial projections."""
        projections = []
        current_date = datetime.now()
        
        for i in range(12):  # 12 months projection
            date = current_date + timedelta(days=30*i)
            savings = user_data["savings"] + (user_data["income"] - sum(user_data["expenses"].values())) * (i+1)
            projections.append({
                "date": date.strftime("%Y-%m-%d"),
                "savings": savings,
                "income": user_data["income"],
                "expenses": sum(user_data["expenses"].values())
            })
        
        return projections

    def simulate_expense_reduction(self, user_data, expense_type, reduction_percentage):
        """Simulate the impact of reducing a specific expense."""
        modified_data = user_data.copy()
        modified_data["expenses"][expense_type] *= (1 - reduction_percentage/100)
        
        # Generate new predictions
        new_predictions = self.analyze_financial_health(modified_data)
        
        # Calculate impact
        impact = {
            "net_worth_impact": new_predictions["savings_projection"] - user_data["savings"],
            "net_worth_change": new_predictions["savings_projection"] - new_predictions["savings_projection"],
            "monthly_cash_flow": (user_data["income"] - sum(modified_data["expenses"].values())),
            "cash_flow_change": sum(user_data["expenses"].values()) - sum(modified_data["expenses"].values()),
            "risk_level": new_predictions["risk_level"],
            "risk_change": "Improved" if new_predictions["risk_level"] < self._predict_risk_level(self._prepare_features(user_data)) else "Same",
            "analysis": self._generate_simulation_analysis(user_data, modified_data, "expense_reduction", expense_type, reduction_percentage)
        }
        
        return impact

    def simulate_income_increase(self, user_data, increase_percentage):
        """Simulate the impact of increasing income."""
        modified_data = user_data.copy()
        modified_data["income"] *= (1 + increase_percentage/100)
        
        # Generate new predictions
        new_predictions = self.analyze_financial_health(modified_data)
        
        # Calculate impact
        impact = {
            "net_worth_impact": new_predictions["savings_projection"] - user_data["savings"],
            "net_worth_change": new_predictions["savings_projection"] - new_predictions["savings_projection"],
            "monthly_cash_flow": (modified_data["income"] - sum(user_data["expenses"].values())),
            "cash_flow_change": modified_data["income"] - user_data["income"],
            "risk_level": new_predictions["risk_level"],
            "risk_change": "Improved" if new_predictions["risk_level"] < self._predict_risk_level(self._prepare_features(user_data)) else "Same",
            "analysis": self._generate_simulation_analysis(user_data, modified_data, "income_increase", None, increase_percentage)
        }
        
        return impact

    def simulate_loan(self, user_data, amount, term, interest_rate, purpose):
        """Simulate the impact of taking a loan."""
        modified_data = user_data.copy()
        monthly_payment = self._calculate_loan_payment(amount, interest_rate, term)
        
        # Add loan to debt
        modified_data["debt"] += amount
        # Add monthly payment to expenses
        modified_data["expenses"]["loan_payment"] = monthly_payment
        
        # Generate new predictions
        new_predictions = self.analyze_financial_health(modified_data)
        
        # Calculate impact
        impact = {
            "net_worth_impact": new_predictions["savings_projection"] - user_data["savings"],
            "net_worth_change": new_predictions["savings_projection"] - new_predictions["savings_projection"],
            "monthly_cash_flow": (user_data["income"] - sum(modified_data["expenses"].values())),
            "cash_flow_change": -monthly_payment,
            "risk_level": new_predictions["risk_level"],
            "risk_change": "Increased" if new_predictions["risk_level"] > self._predict_risk_level(self._prepare_features(user_data)) else "Same",
            "analysis": self._generate_simulation_analysis(user_data, modified_data, "loan", purpose, amount)
        }
        
        return impact

    def simulate_investment(self, user_data, amount, risk_level, duration, strategy):
        """Simulate the impact of an investment."""
        modified_data = user_data.copy()
        modified_data["savings"] -= amount  # Initial investment
        
        # Calculate expected returns based on risk level and duration
        returns = self._calculate_expected_returns(amount, risk_level, duration, strategy)
        
        # Generate new predictions
        new_predictions = self.analyze_financial_health(modified_data)
        
        # Calculate impact
        impact = {
            "net_worth_impact": returns - amount,
            "net_worth_change": returns - amount,
            "monthly_cash_flow": (user_data["income"] - sum(user_data["expenses"].values())),
            "cash_flow_change": 0,
            "risk_level": new_predictions["risk_level"],
            "risk_change": "Increased" if risk_level == "Aggressive" else "Same",
            "analysis": self._generate_simulation_analysis(user_data, modified_data, "investment", strategy, amount)
        }
        
        return impact

    def _calculate_loan_payment(self, amount, interest_rate, term):
        """Calculate monthly loan payment."""
        monthly_rate = interest_rate / 12 / 100
        return amount * (monthly_rate * (1 + monthly_rate)**term) / ((1 + monthly_rate)**term - 1)

    def _calculate_expected_returns(self, amount, risk_level, duration, strategy):
        """Calculate expected investment returns."""
        # Base annual returns based on risk level
        base_returns = {
            "Conservative": 0.03,
            "Moderate": 0.06,
            "Aggressive": 0.09
        }
        
        # Strategy multipliers
        strategy_multipliers = {
            "Growth": 1.2,
            "Income": 0.8,
            "Balanced": 1.0
        }
        
        # Duration in years
        years = int(duration.split()[0])
        
        # Calculate compound returns
        annual_return = base_returns[risk_level] * strategy_multipliers[strategy]
        return amount * (1 + annual_return)**years

    def _generate_simulation_analysis(self, original_data, modified_data, scenario_type, parameter, value):
        """Generate AI analysis for simulation results."""
        prompt = f"""
        Analyze this financial simulation:
        Scenario: {scenario_type}
        Parameter: {parameter}
        Value: {value}
        
        Original Situation:
        - Monthly Income: ${original_data['income']:,.2f}
        - Monthly Expenses: ${sum(original_data['expenses'].values()):,.2f}
        - Current Savings: ${original_data['savings']:,.2f}
        - Current Debt: ${original_data['debt']:,.2f}
        
        Modified Situation:
        - Monthly Income: ${modified_data['income']:,.2f}
        - Monthly Expenses: ${sum(modified_data['expenses'].values()):,.2f}
        - Current Savings: ${modified_data['savings']:,.2f}
        - Current Debt: ${modified_data['debt']:,.2f}
        
        Provide a detailed analysis of:
        1. The impact of this change
        2. Potential benefits and risks
        3. Recommendations for implementation
        """
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a financial advisor analyzing simulation results."},
                    {"role": "user", "content": prompt}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error generating simulation analysis: {str(e)}"

    def _calculate_change(self, new_value, old_value):
        """Calculate percentage change."""
        return ((new_value - old_value) / old_value * 100) if old_value != 0 else 0

    def _calculate_risk_change(self, new_risk):
        """Calculate risk level change."""
        risk_levels = ["Low", "Medium", "High"]
        current_index = risk_levels.index(new_risk)
        if current_index == 0:
            return "Improved"
        elif current_index == 2:
            return "Increased"
        else:
            return "Same"

    def generate_recommendations(self, user_data, predictions, simulations):
        """Generate personalized recommendations."""
        recommendations = {
            "Savings": [],
            "Debt Management": [],
            "Investment": [],
            "Expense Optimization": []
        }
        
        # Generate recommendations based on health score
        if predictions["health_score"] < 60:
            recommendations["Savings"].append({
                "title": "Emergency Fund",
                "description": "Build an emergency fund covering 3-6 months of expenses.",
                "action": "Set up automatic savings"
            })
        
        # Generate recommendations based on risk level
        if predictions["risk_level"] == "High":
            recommendations["Debt Management"].append({
                "title": "Debt Reduction",
                "description": "Focus on paying down high-interest debt.",
                "action": "Create debt repayment plan"
            })
        
        # Generate recommendations based on simulations
        for sim_type, sim_data in simulations.items():
            if "expense_reduction" in sim_type:
                if sim_data["net_worth_impact"] > 0:
                    recommendations["Expense Optimization"].append({
                        "title": "Expense Reduction",
                        "description": f"Reducing {sim_type.split('_')[-1]} expenses showed positive impact.",
                        "action": "Implement expense reduction"
                    })
            
            if "investment" in sim_type:
                if sim_data["net_worth_impact"] > 0:
                    recommendations["Investment"].append({
                        "title": "Investment Opportunity",
                        "description": "Consider starting an investment portfolio.",
                        "action": "Open investment account"
                    })
        
        return recommendations 