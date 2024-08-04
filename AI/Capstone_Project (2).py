import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
from sklearn.metrics import recall_score
df = pd.read_csv(r'C:\Users\zeinab\OneDrive\Desktop\Capstone\ai\First Dataset\dataset.csv')

df2=df.drop(columns="Disease")

# Concatenate all columns into a single Series
unique_values = pd.Series(df2.values.flatten()).unique()

# Create a new DataFrame with all unique values
dummy_df = pd.DataFrame()

# Loop through each unique value
for value in unique_values:
    # Create a column indicating if the value exists in any column of the original DataFrame
    dummy_df[value] = df2.apply(lambda row: int(value in row.values), axis=1)

print(dummy_df)

dummy_df.to_csv(r'C:\Users\zeinab\OneDrive\Desktop\Capstone\ai\DataInBinary.csv', index=False)

#extract disease column 
Disease=df['Disease'].values
df_Disease= pd.DataFrame(Disease)

#re-add disease column to dataframe
df_Binary = pd.concat([df_Disease, dummy_df], axis = 1)
df_Binary.head()

#adjust visual of dataframe
df_Binary.drop(df_Binary.columns[5], axis=1, inplace=True)
df_Binary.rename(columns = {df_Binary.columns[0]:'Disease'}, inplace = True)
df_Binary.to_csv(r'C:\Users\zeinab\OneDrive\Desktop\Capstone\ai\DataInBinary.csv', index=False)
df_Binary.head()

df_Binary['Disease'].value_counts()

#dropping duplicated rows
df_Binary2 = df_Binary.drop_duplicates()


# In[45]:


df_Binary2.to_csv(r'C:\Users\zeinab\OneDrive\Desktop\Capstone\ai\After_dropping_duplicated.csv',index=False)


# In[46]:


#repeating training and testing knn model


# In[47]:


X = df_Binary2.drop(['Disease'], axis=1)
y=df_Binary2['Disease']


# In[48]:


X_train2, X_test2, y_train2, y_test2 = train_test_split(X, y, test_size = 0.2, random_state = 42)


# In[49]:


X_train2.shape


# In[50]:


# k=3 
#instantiate the model
knn = KNeighborsClassifier(n_neighbors=3)

#fit the model to the training set
knn.fit(X_train2, y_train2)


# In[51]:


y_pred2 = knn.predict(X_test2)
print(y_pred2)


# In[52]:


#calculating recall score
recall = recall_score(y_test2, y_pred2, average='macro')
print('Recall: %.3f' % recall)


# In[53]:


print('Model accuracy score: ', accuracy_score(y_test2, y_pred2))

# save the model as pickle
import pickle
filename = 'picklemodel.sav'
pickle.dump(knn, open(filename, 'wb'))


# In[57]:


load_model = pickle.load(open(filename, 'rb'))

# Save the column names
column_names = X.columns.tolist()
with open('column_names.pkl', 'wb') as file:
    pickle.dump(column_names, file)

# In[59]:
with open('column_names.pkl', 'rb') as file:
    column_names = pickle.load(file)

# Input data
input_data = [[1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0]]

# Convert input data to DataFrame with correct column names
input_df = pd.DataFrame(input_data, columns=column_names)


predictions = load_model.predict(input_df)
print(predictions)
# In[ ]: