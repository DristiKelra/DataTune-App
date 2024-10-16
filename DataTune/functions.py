import numpy as np


def preprocess_data(df):
    # Handle null and NaN values
    df.fillna(method='ffill', inplace=True)  # Replace NaN values with empty strings or any other appropriate value
    
    # Replace null values with appropriate median or mean values
    numeric_columns = df.select_dtypes(include=[np.number]).columns  # Get numeric columns
    for col in numeric_columns:
        median_value = df[col].median()  # Calculate median value for the column
        df[col].fillna(median_value, inplace=True)  # Replace null values with median
        
    # Convert text to lowercase
    df['text_column'] = df['text_column'].str.lower()
    
    # Remove punctuation
    df['text_column'] = df['text_column'].apply(lambda x: re.sub(r'[^\w\s]', '', x))
    # Save the preprocessed data
    df.to_csv('preprocessed_data.csv', index=False)

    return df


