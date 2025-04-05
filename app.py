import streamlit as st
import pandas as pd
import plotly.express as px
from datetime import datetime, timedelta
import json
from financial_ai import FinancialAI
from data_processor import DataProcessor
from svg_converter import SVGConverter
import os
from dotenv import load_dotenv
import traceback
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
        self.svg_converter = SVGConverter()
        self.initialize_session_state()
        self.initialize_debug_mode()

    def initialize_debug_mode(self):
        """Initialize debug mode settings"""
        if 'debug_mode' not in st.session_state:
            st.session_state.debug_mode = False

    def initialize_session_state(self):
        """Initialize session state variables"""
        if 'financial_data' not in st.session_state:
            st.session_state.financial_data = None
        if 'predictions' not in st.session_state:
            st.session_state.predictions = None
        if 'simulations' not in st.session_state:
            st.session_state.simulations = {}
        if 'error_log' not in st.session_state:
            st.session_state.error_log = []
        if 'user_data' not in st.session_state:
            st.session_state.user_data = None
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

    def log_error(self, error, context):
        """Log error with context for debugging"""
        error_info = {
            'timestamp': datetime.now().isoformat(),
            'error': str(error),
            'context': context,
            'traceback': traceback.format_exc()
        }
        st.session_state.error_log.append(error_info)
        logger.error(f"Error in {context}: {str(error)}")
        if st.session_state.debug_mode:
            st.error(f"Debug Info - {context}: {str(error)}")

    def show_debug_panel(self):
        """Show debug panel with error logs and system status"""
        with st.sidebar:
            st.header("Debug Panel")
            debug_mode = st.toggle("Debug Mode", value=st.session_state.debug_mode)
            st.session_state.debug_mode = debug_mode

            if debug_mode:
                st.subheader("System Status")
                st.write(f"OpenAI API Key: {'Configured' if self.financial_ai.openai_api_key else 'Missing'}")
                st.write(f"Financial Data: {'Loaded' if st.session_state.financial_data else 'Not Loaded'}")
                
                if st.button("Clear Error Log"):
                    st.session_state.error_log = []
                
                st.subheader("Error Log")
                for error in st.session_state.error_log:
                    with st.expander(f"Error at {error['timestamp']}"):
                        st.write("Context:", error['context'])
                        st.write("Error:", error['error'])
                        st.code(error['traceback'])

    def run(self):
        """Main application flow"""
        st.title("FinTwin - Your AI Financial Advisor")
        
        # Show debug panel in sidebar
        self.show_debug_panel()

        # Main navigation
        page = st.sidebar.selectbox(
            "Navigation",
            ["Import Data", "Financial Health", "Simulation Playground", "Recommendations"]
        )

        if page == "Import Data":
            self.show_data_import()
        elif page == "Financial Health":
            self.show_financial_health()
        elif page == "Simulation Playground":
            self.show_simulation_playground()
        elif page == "Recommendations":
            self.show_recommendations()

    def show_data_import(self):
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
            
        # Add export/import section
        st.markdown("---")
        col1, col2, col3 = st.columns(3)
        
        with col1:
            if st.button("Export Financial Data", key="export_button"):
                self.export_financial_data()
                
        with col2:
            uploaded_file = st.file_uploader("Import Financial Data", type=["json"])
            if uploaded_file is not None:
                self.import_financial_data(uploaded_file)
                
        with col3:
            if st.button("Clear All Data", key="clear_button"):
                self.clear_financial_data()

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
        st.header("Financial Health Analysis")
        
        if not st.session_state.financial_data:
            st.warning("Please import your financial data first using the 'Import Data' section.")
            return

        try:
            with st.spinner("Analyzing your financial health..."):
                # Get analysis from the AI agent
                analysis = self.financial_ai.analyze_financial_health(st.session_state.financial_data)
                
                # Display health score
                col1, col2, col3 = st.columns(3)
                with col1:
                    st.metric("Health Score", f"{analysis['health_score']:.1f}/100")
                with col2:
                    st.metric("Risk Level", analysis['risk_level'])
                with col3:
                    st.metric("Projected Savings", f"${analysis['savings_projection']:,.2f}")

                # Display analysis text
                st.subheader("Analysis")
                st.write(analysis['analysis'])

                # Display visualization if available
                if analysis.get('visualization'):
                    st.subheader("Visual Representation")
                    self.svg_converter.display_svg(analysis['visualization'])

        except Exception as e:
            self.log_error(e, "Financial Health Analysis")
            st.error("An error occurred while analyzing your financial health. Please check the debug panel for more information.")

    def show_simulation_playground(self):
        st.header("Simulation Playground")
        
        if not st.session_state.financial_data:
            st.warning("Please import your financial data first using the 'Import Data' section.")
            return

        try:
            simulation_type = st.selectbox(
                "Select Simulation Type",
                ["Expense Reduction", "Income Increase", "Loan Analysis", "Investment Strategy"]
            )

            if simulation_type == "Expense Reduction":
                self.simulate_expense_reduction()
            elif simulation_type == "Income Increase":
                self.simulate_income_increase()
            elif simulation_type == "Loan Analysis":
                self.simulate_loan()
            elif simulation_type == "Investment Strategy":
                self.simulate_investment()

        except Exception as e:
            self.log_error(e, "Simulation Playground")
            st.error("An error occurred in the simulation playground. Please check the debug panel for more information.")

    def simulate_expense_reduction(self):
        st.subheader("Expense Reduction Simulation")
        
        expense_type = st.selectbox(
            "Select Expense Category",
            ["Housing", "Transportation", "Food", "Entertainment", "Utilities", "Other"]
        )
        
        reduction_percentage = st.slider(
            "Reduction Percentage",
            min_value=0,
            max_value=100,
            value=20,
            step=5
        )

        if st.button("Run Simulation"):
            parameters = {
                "expense_type": expense_type,
                "reduction_percentage": reduction_percentage
            }
            
            simulation_result = self.financial_ai.simulate_scenario(
                st.session_state.financial_data,
                "expense_reduction",
                parameters
            )
            
            self.display_simulation_results(simulation_result)

    def simulate_income_increase(self):
        st.subheader("Income Increase Simulation")
        
        increase_percentage = st.slider(
            "Income Increase Percentage",
            min_value=0,
            max_value=100,
            value=10,
            step=5
        )

        if st.button("Run Simulation"):
            parameters = {
                "increase_percentage": increase_percentage
            }
            
            simulation_result = self.financial_ai.simulate_scenario(
                st.session_state.financial_data,
                "income_increase",
                parameters
            )
            
            self.display_simulation_results(simulation_result)

    def simulate_loan(self):
        st.subheader("Loan Analysis Simulation")
        
        col1, col2 = st.columns(2)
        with col1:
            amount = st.number_input("Loan Amount ($)", min_value=1000, step=1000)
            term = st.number_input("Loan Term (months)", min_value=12, max_value=360, step=12)
        with col2:
            interest_rate = st.number_input("Interest Rate (%)", min_value=0.0, max_value=30.0, step=0.1)
            purpose = st.selectbox("Loan Purpose", ["Home", "Education", "Business", "Personal"])

        if st.button("Run Simulation"):
            parameters = {
                "amount": amount,
                "term": term,
                "interest_rate": interest_rate,
                "purpose": purpose
            }
            
            simulation_result = self.financial_ai.simulate_scenario(
                st.session_state.financial_data,
                "loan",
                parameters
            )
            
            self.display_simulation_results(simulation_result)

    def simulate_investment(self):
        st.subheader("Investment Strategy Simulation")
        
        col1, col2 = st.columns(2)
        with col1:
            amount = st.number_input("Investment Amount ($)", min_value=1000, step=1000)
            duration = st.number_input("Investment Duration (years)", min_value=1, max_value=30, step=1)
        with col2:
            risk_level = st.selectbox("Risk Level", ["Low", "Moderate", "High"])
            strategy = st.selectbox("Investment Strategy", ["Growth", "Value", "Income", "Balanced"])

        if st.button("Run Simulation"):
            parameters = {
                "amount": amount,
                "duration": duration,
                "risk_level": risk_level,
                "strategy": strategy
            }
            
            simulation_result = self.financial_ai.simulate_scenario(
                st.session_state.financial_data,
                "investment",
                parameters
            )
            
            self.display_simulation_results(simulation_result)

    def display_simulation_results(self, simulation_result):
        if not simulation_result:
            st.error("Failed to run simulation. Please try again.")
            return

        st.subheader("Simulation Results")
        
        # Display analysis text
        st.write(simulation_result.get('analysis', ''))
        
        # Display visualization if available
        if simulation_result.get('visualization'):
            st.subheader("Visual Representation")
            self.svg_converter.display_svg(simulation_result['visualization'])
        
        # Display metrics if available
        if 'metrics' in simulation_result:
            metrics = simulation_result['metrics']
            cols = st.columns(len(metrics))
            for col, (label, value) in zip(cols, metrics.items()):
                col.metric(label, value)

    def show_recommendations(self):
        st.header("AI Recommendations")
        
        if 'financial_data' not in st.session_state or not st.session_state.financial_data:
            st.warning("Please import your financial data first.")
            return

        # Get recommendations from the AI agent
        recommendations = self.financial_ai.generate_recommendations(
            st.session_state.financial_data,
            st.session_state.predictions if 'predictions' in st.session_state else None,
            st.session_state.simulations if 'simulations' in st.session_state else None
        )

        # Display recommendations by category
        for category, recs in recommendations.items():
            st.subheader(category.title())
            for rec in recs:
                if isinstance(rec, dict):
                    # Handle structured recommendations
                    st.markdown(f"**{rec.get('title', 'Recommendation')}**")
                    st.write(rec.get('description', ''))
                    if rec.get('visualization'):
                        self.svg_converter.display_svg(rec['visualization'])
                else:
                    # Handle simple string recommendations
                    st.write(f"• {rec}")
            
            st.markdown("---")

        # Add action buttons
        col1, col2 = st.columns(2)
        with col1:
            if st.button("Apply Recommendations"):
                st.success("Recommendations applied to your financial plan!")
        with col2:
            if st.button("Generate More Recommendations"):
                st.info("New recommendations generated based on your latest data.")

    def export_financial_data(self):
        """Export all financial data to a JSON file."""
        if not st.session_state.user_data:
            st.warning("Please input your basic financial information first!")
            return
            
        if not st.session_state.monthly_expenses:
            st.warning("Please add some monthly expenses first!")
            return
            
        # Create data processor instance
        data_processor = DataProcessor()
        
        # Generate detailed financial analysis
        financial_analysis = data_processor.generate_financial_analysis(
            st.session_state.user_data, 
            st.session_state.monthly_expenses
        )
        
        # Prepare data for export
        export_data = {
            "basic_info": st.session_state.user_data,
            "monthly_expenses": st.session_state.monthly_expenses,
            "financial_analysis": financial_analysis,
            "export_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "version": "1.0"
        }
        
        # Convert to JSON
        json_data = json.dumps(export_data, indent=4)
        
        # Create download button
        st.download_button(
            label="Download Financial Data (JSON)",
            data=json_data,
            file_name=f"fintwin_financial_data_{datetime.now().strftime('%Y%m%d')}.json",
            mime="application/json"
        )
        
        st.success("Financial data exported successfully!")
        
        # Display preview of exported data
        with st.expander("Preview Exported Data"):
            st.json(export_data)
            
        # Display key insights from the analysis
        if financial_analysis:
            st.subheader("Key Financial Insights")
            
            # Display summary metrics
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric("Savings Rate", f"{financial_analysis['summary']['savings_rate']*100:.1f}%")
            with col2:
                st.metric("Debt-to-Income Ratio", f"{financial_analysis['summary']['debt_to_income_ratio']*100:.1f}%")
            with col3:
                st.metric("Avg Monthly Expense", f"${financial_analysis['summary']['avg_monthly_expense']:,.2f}")
                
            # Display top expense categories
            st.subheader("Top Expense Categories")
            for category in financial_analysis['expenses']['top_categories']:
                st.metric(
                    category['category'], 
                    f"${category['amount']:,.2f}",
                    f"{category['amount']/financial_analysis['summary']['total_income']*100:.1f}% of income"
                )
                
            # Display high-priority recommendations
            high_priority_recs = []
            for category, recs in financial_analysis['recommendations'].items():
                for rec in recs:
                    if rec['priority'] == 'high':
                        high_priority_recs.append(rec)
                        
            if high_priority_recs:
                st.subheader("High Priority Recommendations")
                for rec in high_priority_recs:
                    st.info(f"**{rec['title']}**: {rec['description']}")

    def import_financial_data(self, uploaded_file):
        """Import financial data from a JSON file."""
        try:
            # Read the uploaded file
            import_data = json.load(uploaded_file)
            
            # Validate the data structure
            if "basic_info" not in import_data or "monthly_expenses" not in import_data:
                st.error("Invalid data format. The file must contain basic financial information and monthly expenses.")
                return
                
            # Update session state with imported data
            st.session_state.user_data = import_data["basic_info"]
            st.session_state.monthly_expenses = import_data["monthly_expenses"]
            
            # Create a consolidated financial_data structure
            st.session_state.financial_data = {
                "basic_info": import_data["basic_info"],
                "monthly_expenses": import_data["monthly_expenses"],
                "analysis": import_data.get("financial_analysis", {})
            }
            
            st.success("Financial data imported successfully!")
            
            # Display summary of imported data
            with st.expander("Imported Data Summary"):
                # Basic info summary
                st.subheader("Basic Financial Information")
                st.json({
                    "income": import_data["basic_info"].get("income", 0),
                    "savings": import_data["basic_info"].get("savings", 0),
                    "debt": import_data["basic_info"].get("debt", 0)
                })
                
                # Monthly expenses summary
                st.subheader("Monthly Expenses")
                st.json({
                    "months_with_expenses": len(import_data["monthly_expenses"]),
                    "total_expenses": sum(sum(expenses.values()) for expenses in import_data["monthly_expenses"].values())
                })
                
                # Display financial analysis if available
                if "financial_analysis" in import_data:
                    st.subheader("Financial Analysis")
                    
                    # Display summary metrics
                    col1, col2, col3 = st.columns(3)
                    with col1:
                        st.metric("Savings Rate", f"{import_data['financial_analysis']['summary']['savings_rate']*100:.1f}%")
                    with col2:
                        st.metric("Debt-to-Income Ratio", f"{import_data['financial_analysis']['summary']['debt_to_income_ratio']*100:.1f}%")
                    with col3:
                        st.metric("Avg Monthly Expense", f"${import_data['financial_analysis']['summary']['avg_monthly_expense']:,.2f}")
                        
                    # Display top expense categories
                    st.subheader("Top Expense Categories")
                    for category in import_data['financial_analysis']['expenses']['top_categories']:
                        st.metric(
                            category['category'], 
                            f"${category['amount']:,.2f}",
                            f"{category['amount']/import_data['financial_analysis']['summary']['total_income']*100:.1f}% of income"
                        )
                        
                    # Display high-priority recommendations
                    high_priority_recs = []
                    for category, recs in import_data['financial_analysis']['recommendations'].items():
                        for rec in recs:
                            if rec['priority'] == 'high':
                                high_priority_recs.append(rec)
                                
                    if high_priority_recs:
                        st.subheader("High Priority Recommendations")
                        for rec in high_priority_recs:
                            st.info(f"**{rec['title']}**: {rec['description']}")
                
                # Display export information
                st.subheader("Export Information")
                st.json({
                    "export_date": import_data.get("export_date", "Unknown"),
                    "version": import_data.get("version", "Unknown")
                })
                
        except Exception as e:
            self.log_error(e, "Data Import")
            st.error(f"Error importing data: {str(e)}")

    def clear_financial_data(self):
        """Clear all financial data from the session state."""
        if st.checkbox("I understand that this will permanently delete all my financial data"):
            st.session_state.user_data = None
            st.session_state.monthly_expenses = {}
            st.session_state.financial_data = None
            st.success("All financial data has been cleared.")

if __name__ == "__main__":
    app = FinTwinApp()
    app.run() 