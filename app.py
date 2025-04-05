import streamlit as st
import pandas as pd
import plotly.express as px
from datetime import datetime, timedelta
import json
from financial_ai import FinancialAI
from data_processor import DataProcessor
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Page config
st.set_page_config(
    page_title="FinTwin - Your AI Financial Advisor",
    page_icon="💰",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
    <style>
    .main {
        background-color: #f5f5f5;
    }
    .stButton>button {
        background-color: #4CAF50;
        color: white;
        border-radius: 5px;
        padding: 10px 20px;
        border: none;
    }
    .stButton>button:hover {
        background-color: #45a049;
    }
    .stTextInput>div>div>input {
        border-radius: 5px;
    }
    .expense-card {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin-bottom: 20px;
    }
    .month-selector {
        background-color: white;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
    }
    </style>
    """, unsafe_allow_html=True)

class FinTwinApp:
    def __init__(self):
        self.financial_ai = FinancialAI()
        self.data_processor = DataProcessor()
        self.initialize_session_state()

    def initialize_session_state(self):
        if 'user_data' not in st.session_state:
            st.session_state.user_data = None
        if 'predictions' not in st.session_state:
            st.session_state.predictions = None
        if 'simulations' not in st.session_state:
            st.session_state.simulations = {}
        if 'monthly_expenses' not in st.session_state:
            st.session_state.monthly_expenses = {}
        if 'expense_categories' not in st.session_state:
            st.session_state.expense_categories = [
                "Rent/Mortgage",
                "Utilities",
                "Groceries",
                "Transportation",
                "Entertainment",
                "Healthcare",
                "Insurance",
                "Education",
                "Shopping",
                "Dining Out",
                "Travel",
                "Other"
            ]

    def run(self):
        st.title("💰 FinTwin - Your AI Financial Advisor")
        st.markdown("""
            Welcome to FinTwin! Your personal AI-powered financial advisor that helps you:
            - Track and manage your monthly expenses
            - Predict your financial health
            - Simulate different financial scenarios
            - Get personalized recommendations
        """)

        # Sidebar navigation
        page = st.sidebar.radio(
            "Navigation",
            ["Financial Data Management", "Financial Health", "Simulation Playground", "Recommendations"]
        )

        if page == "Financial Data Management":
            self.show_financial_data_management()
        elif page == "Financial Health":
            self.show_financial_health()
        elif page == "Simulation Playground":
            self.show_simulation_playground()
        elif page == "Recommendations":
            self.show_recommendations()

    def show_financial_data_management(self):
        st.header("📊 Financial Data Management")
        st.markdown("""
            Manage your financial data and monthly expenses in one place.
            Your data is encrypted and secure.
        """)

        # Create tabs for different sections
        tab1, tab2 = st.tabs(["Basic Financial Information", "Monthly Expenses"])

        with tab1:
            self.show_basic_financial_info()
        
        with tab2:
            self.show_monthly_expenses()

    def show_basic_financial_info(self):
        st.subheader("Basic Financial Information")
        
        with st.form("financial_data_form"):
            st.markdown("#### Income Information")
            monthly_income = st.number_input("Monthly Income ($)", min_value=0.0, step=100.0)
            
            st.markdown("#### Savings and Debt")
            col1, col2 = st.columns(2)
            with col1:
                savings = st.number_input("Current Savings ($)", min_value=0.0, step=100.0)
            with col2:
                debt = st.number_input("Current Debt ($)", min_value=0.0, step=100.0)

            if st.form_submit_button("Save Basic Information"):
                user_data = {
                    "income": monthly_income,
                    "savings": savings,
                    "debt": debt
                }
                st.session_state.user_data = user_data
                st.success("Basic financial information saved successfully!")

    def show_monthly_expenses(self):
        st.subheader("Monthly Expenses")
        
        # Month and Year Selection
        col1, col2 = st.columns(2)
        with col1:
            selected_month = st.selectbox(
                "Select Month",
                ["January", "February", "March", "April", "May", "June", 
                 "July", "August", "September", "October", "November", "December"]
            )
        with col2:
            current_year = datetime.now().year
            selected_year = st.selectbox(
                "Select Year",
                range(current_year - 2, current_year + 1)
            )

        # Initialize month data if not exists
        month_key = f"{selected_year}-{selected_month}"
        if month_key not in st.session_state.monthly_expenses:
            st.session_state.monthly_expenses[month_key] = {
                category: 0.0 for category in st.session_state.expense_categories
            }

        # Expense Input Form
        with st.form(f"expense_form_{month_key}"):
            st.markdown(f"#### Expenses for {selected_month} {selected_year}")
            
            # Create columns for better layout
            cols = st.columns(3)
            expense_data = {}
            
            for i, category in enumerate(st.session_state.expense_categories):
                col_idx = i % 3
                with cols[col_idx]:
                    expense_data[category] = st.number_input(
                        f"{category} ($)",
                        min_value=0.0,
                        value=float(st.session_state.monthly_expenses[month_key][category]),
                        step=10.0
                    )

            if st.form_submit_button("Save Monthly Expenses"):
                st.session_state.monthly_expenses[month_key] = expense_data
                st.success(f"Expenses for {selected_month} {selected_year} saved successfully!")

        # Display Monthly Summary
        st.markdown("#### Monthly Summary")
        self.show_monthly_summary(month_key)

        # Display Expense History
        st.markdown("#### Expense History")
        self.show_expense_history()

    def show_monthly_summary(self, month_key):
        if month_key in st.session_state.monthly_expenses:
            expenses = st.session_state.monthly_expenses[month_key]
            
            # Create summary metrics
            col1, col2, col3 = st.columns(3)
            with col1:
                total_expenses = sum(expenses.values())
                st.metric("Total Expenses", f"${total_expenses:,.2f}")
            
            with col2:
                avg_expense = total_expenses / len(expenses) if expenses else 0
                st.metric("Average Expense", f"${avg_expense:,.2f}")
            
            with col3:
                max_expense = max(expenses.values()) if expenses else 0
                max_category = max(expenses.items(), key=lambda x: x[1])[0] if expenses else "N/A"
                st.metric("Highest Expense", f"${max_expense:,.2f}", f"({max_category})")

            # Create visualizations
            col1, col2 = st.columns(2)
            with col1:
                # Pie chart for expense distribution
                fig_pie = self.data_processor.create_expense_breakdown(expenses)
                st.plotly_chart(fig_pie, use_container_width=True)
            
            with col2:
                # Bar chart for expense comparison
                fig_bar = self.data_processor.create_expense_comparison(expenses)
                st.plotly_chart(fig_bar, use_container_width=True)

    def show_expense_history(self):
        if not st.session_state.monthly_expenses:
            st.info("No expense history available. Start by adding expenses for any month.")
            return

        # Create a DataFrame for all expenses
        expense_history = []
        for month_key, expenses in st.session_state.monthly_expenses.items():
            year, month = month_key.split('-')
            for category, amount in expenses.items():
                expense_history.append({
                    'Year': year,
                    'Month': month,
                    'Category': category,
                    'Amount': amount
                })
        
        df = pd.DataFrame(expense_history)
        
        # Create time series visualization
        fig_timeline = self.data_processor.create_expense_timeline(df)
        st.plotly_chart(fig_timeline, use_container_width=True)
        
        # Create category-wise trend visualization
        fig_trend = self.data_processor.create_category_trends(df)
        st.plotly_chart(fig_trend, use_container_width=True)

    def show_financial_health(self):
        if not st.session_state.user_data:
            st.warning("Please input your financial data first!")
            return

        st.header("📈 Financial Health Analysis")
        
        # Generate predictions
        if st.session_state.predictions is None:
            with st.spinner("Analyzing your financial health..."):
                st.session_state.predictions = self.financial_ai.analyze_financial_health(
                    st.session_state.user_data
                )

        # Display predictions
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Financial Health Score",
                f"{st.session_state.predictions['health_score']}%",
                delta=f"{st.session_state.predictions['health_score_change']}%"
            )
        with col2:
            st.metric(
                "Risk Level",
                st.session_state.predictions['risk_level'],
                delta=st.session_state.predictions['risk_change']
            )
        with col3:
            st.metric(
                "Savings Projection",
                f"${st.session_state.predictions['savings_projection']:,.2f}",
                delta=f"${st.session_state.predictions['savings_change']:,.2f}"
            )

        # Display charts
        st.subheader("Financial Projections")
        fig = self.data_processor.create_projection_chart(st.session_state.predictions)
        st.plotly_chart(fig, use_container_width=True)

    def show_simulation_playground(self):
        if not st.session_state.user_data:
            st.warning("Please input your financial data first!")
            return

        st.header("🎮 Simulation Playground")
        st.markdown("""
            Experiment with different financial scenarios to see how they affect your future.
        """)

        scenario_type = st.selectbox(
            "Choose a scenario to simulate:",
            ["Reduce Expenses", "Increase Income", "Take a Loan", "Investment Strategy"]
        )

        if scenario_type == "Reduce Expenses":
            self.simulate_expense_reduction()
        elif scenario_type == "Increase Income":
            self.simulate_income_increase()
        elif scenario_type == "Take a Loan":
            self.simulate_loan()
        else:
            self.simulate_investment()

    def simulate_expense_reduction(self):
        st.subheader("Reduce Expenses")
        expense_type = st.selectbox(
            "Select expense to reduce:",
            list(st.session_state.user_data["expenses"].keys())
        )
        reduction = st.slider(
            "Reduction percentage:",
            min_value=0,
            max_value=100,
            value=20,
            step=5
        )

        if st.button("Run Simulation"):
            with st.spinner("Running simulation..."):
                simulation = self.financial_ai.simulate_expense_reduction(
                    st.session_state.user_data,
                    expense_type,
                    reduction
                )
                st.session_state.simulations[f"expense_reduction_{expense_type}"] = simulation
                self.display_simulation_results(simulation)

    def simulate_income_increase(self):
        st.subheader("Increase Income")
        increase = st.slider(
            "Income increase percentage:",
            min_value=0,
            max_value=100,
            value=10,
            step=5
        )

        if st.button("Run Simulation"):
            with st.spinner("Running simulation..."):
                simulation = self.financial_ai.simulate_income_increase(
                    st.session_state.user_data,
                    increase
                )
                st.session_state.simulations["income_increase"] = simulation
                self.display_simulation_results(simulation)

    def simulate_loan(self):
        st.subheader("Take a Loan")
        col1, col2 = st.columns(2)
        with col1:
            amount = st.number_input("Loan Amount ($)", min_value=1000, step=1000)
            term = st.selectbox("Loan Term", [12, 24, 36, 48, 60])
        with col2:
            interest_rate = st.slider("Interest Rate (%)", min_value=0.0, max_value=20.0, step=0.5)
            purpose = st.selectbox("Loan Purpose", ["Home", "Car", "Education", "Other"])

        if st.button("Run Simulation"):
            with st.spinner("Running simulation..."):
                simulation = self.financial_ai.simulate_loan(
                    st.session_state.user_data,
                    amount,
                    term,
                    interest_rate,
                    purpose
                )
                st.session_state.simulations[f"loan_{purpose}"] = simulation
                self.display_simulation_results(simulation)

    def simulate_investment(self):
        st.subheader("Investment Strategy")
        col1, col2 = st.columns(2)
        with col1:
            amount = st.number_input("Investment Amount ($)", min_value=100, step=100)
            risk_level = st.select_slider(
                "Risk Level",
                options=["Conservative", "Moderate", "Aggressive"]
            )
        with col2:
            duration = st.selectbox(
                "Investment Duration",
                ["1 year", "3 years", "5 years", "10 years"]
            )
            strategy = st.selectbox(
                "Investment Strategy",
                ["Growth", "Income", "Balanced"]
            )

        if st.button("Run Simulation"):
            with st.spinner("Running simulation..."):
                simulation = self.financial_ai.simulate_investment(
                    st.session_state.user_data,
                    amount,
                    risk_level,
                    duration,
                    strategy
                )
                st.session_state.simulations[f"investment_{strategy}"] = simulation
                self.display_simulation_results(simulation)

    def display_simulation_results(self, simulation):
        st.subheader("Simulation Results")
        
        # Display key metrics
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(
                "Net Worth Impact",
                f"${simulation['net_worth_impact']:,.2f}",
                delta=f"${simulation['net_worth_change']:,.2f}"
            )
        with col2:
            st.metric(
                "Monthly Cash Flow",
                f"${simulation['monthly_cash_flow']:,.2f}",
                delta=f"${simulation['cash_flow_change']:,.2f}"
            )
        with col3:
            st.metric(
                "Risk Level",
                simulation['risk_level'],
                delta=simulation['risk_change']
            )

        # Display charts
        st.subheader("Projection Comparison")
        fig = self.data_processor.create_simulation_chart(simulation)
        st.plotly_chart(fig, use_container_width=True)

        # Display AI analysis
        st.subheader("AI Analysis")
        st.markdown(simulation['analysis'])

    def show_recommendations(self):
        if not st.session_state.user_data:
            st.warning("Please input your financial data first!")
            return

        st.header("💡 Personalized Recommendations")
        
        # Generate recommendations
        with st.spinner("Generating personalized recommendations..."):
            recommendations = self.financial_ai.generate_recommendations(
                st.session_state.user_data,
                st.session_state.predictions,
                st.session_state.simulations
            )

        # Display recommendations
        for category, recs in recommendations.items():
            with st.expander(category):
                for rec in recs:
                    st.markdown(f"### {rec['title']}")
                    st.markdown(rec['description'])
                    if 'action' in rec:
                        st.button(
                            f"Take Action: {rec['action']}",
                            key=f"action_{rec['title']}"
                        )

if __name__ == "__main__":
    app = FinTwinApp()
    app.run() 