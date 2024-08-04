#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
from sklearn.metrics import recall_score
df = pd.read_csv('dataset.csv')


# In[2]:


df.head()


# In[3]:


df.info() 


# In[4]:


df.describe() #more than 1 symptom have the same top value, unique rows are significantly small compared to total. 


# In[5]:


# import matplotlib.pyplot as plt
# df.hist(bins=50, figsize=(20,15))
# plt.savefig("Attribute_histogram_plots")
# plt.show()


# In[6]:


df.isna().any() #all attributes have missing values except for the first two.


# In[7]:


df.isna().sum() #there are varying nb of missing values.


# In[8]:


df.duplicated().any() #there are duplicated rows.


# In[9]:


df.duplicated().sum() #moat of them are duplicated rows.


# In[10]:


df2=df.drop(columns="Disease")


# In[11]:


# Concatenate all columns into a single Series
unique_values = pd.Series(df2.values.flatten()).unique()

# Create a new DataFrame with all unique values
dummy_df = pd.DataFrame()

# Loop through each unique value
for value in unique_values:
    # Create a column indicating if the value exists in any column of the original DataFrame
    dummy_df[value] = df2.apply(lambda row: int(value in row.values), axis=1)

print(dummy_df)


# In[12]:


dummy_df.to_csv(r'C:\Users\User\Desktop\capstone\excel sheets\DataInBinary.csv', index=False)


# In[13]:


#extract disease column 
Disease=df['Disease'].values
df_Disease= pd.DataFrame(Disease)


# In[14]:


#re-add disease column to dataframe
df_Binary = pd.concat([df_Disease, dummy_df], axis = 1)
df_Binary.head()


# In[15]:


df_Binary.isna().sum()


# In[16]:


#adjust visual of dataframe
df_Binary.drop(df_Binary.columns[5], axis=1, inplace=True)
df_Binary.rename(columns = {df_Binary.columns[0]:'Disease'}, inplace = True)
df_Binary.to_csv(r'C:\Users\User\Desktop\capstone\excel sheets\DataInBinary.csv', index=False)
df_Binary.head()


# In[17]:


df_Binary['Disease'].value_counts()


# In[18]:


#create a df for correlation purposes by adding a new column containing codes for disease as numerical values.
df_for_correlation= df_Binary.copy()
df_for_correlation['Disease_cat'] = df_Binary['Disease'].astype('category').cat.codes
df_for_correlation.head()


# In[19]:


#create a new df for showing each code for its corresponding disease name and save in a new csv file.
df_codes= df_for_correlation['Disease_cat']
df_Disease_codes= pd.concat([df_codes , df_Disease], axis = 1)
df_Disease_codes.rename(columns = {df_Disease_codes.columns[1]:'Disease_name'}, inplace = True)
df_Disease_codes=df_Disease_codes.drop_duplicates()
df_Disease_codes.to_csv(r'C:\Users\User\Desktop\capstone\excel sheets\Disease_codes.csv', index=False)
df_Disease_codes.head()


# In[20]:


#drop the string disease column and save new csv file for correlation step use only.
df_for_correlation.drop(df_Binary.columns[0], axis=1, inplace=True)
df_for_correlation.head()


# In[21]:


#define correlation between attributes
correlation = df_for_correlation.corr()


# In[22]:


#correlation between all attributes and the target variable
correlation['Disease_cat'].sort_values(ascending=False)


# In[23]:


#correlation heatmap between all attributes and the target variable.
correlation_matrix = df_for_correlation.corrwith(df_for_correlation['Disease_cat'])
sorted_correlation = correlation_matrix.abs().sort_values(ascending=False)

plt.figure(figsize=(2, 50))
sns.heatmap(sorted_correlation.to_frame(), annot=True, cmap='coolwarm', fmt=".2f", cbar=False)
plt.title('Correlation Heatmap with Disease variable')
plt.savefig(r'C:\Users\User\Desktop\capstone\figures\Correlation-heat-map.png')
plt.show()


# In[24]:


#Declare feautures vector and target variable "Disease"
X = df_Binary.drop(['Disease'], axis=1)
y=df_Binary['Disease']


# In[25]:


#trying training and testing a knn model on the original dataframe with duplicated rows


# In[26]:


#split X and y into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = None)


# In[27]:


X_train.shape #check shape of training set


# In[28]:


X_test.shape #check shape of testing set


# In[29]:


X_train.isnull().sum() #check missing values in training set


# In[30]:


# k=7
#instantiate the model
knn = KNeighborsClassifier(n_neighbors=7)

#fit the model to the training set
knn.fit(X_train, y_train)


# In[31]:


#getting predicted results
y_pred = knn.predict(X_test)
print(y_pred)


# In[32]:


#calculating recall score
recall = recall_score(y_test, y_pred, average='weighted')
print('Recall: %.3f' % recall)


# In[33]:


print('Model accuracy score: ', accuracy_score(y_test, y_pred))


# In[34]:


print('Model accuracy score: ', knn.score(X_test, y_test))


# In[35]:


#print the scores on training and testing set
print('Training set score: {:.4f}'.format(knn.score(X_train, y_train)))

#this is equivalent to
y_pred_train = knn.predict(X_train)

print('Training set accuracy score: {:.4f}'. format(accuracy_score(y_train, y_pred_train)))


# In[36]:


#Print the Confusion Matrix with k =7 and slice it into four pieces
cm = confusion_matrix(y_test, y_pred)
print('Confusion matrix\n\n', cm)
print('\nTrue Positives(TP) = ', cm[0,0])
print('\nTrue Negatives(TN) = ', cm[1,1])
print('\nFalse Positives(FP) = ', cm[0,1])
print('\nFalse Negatives(FN) = ', cm[1,0])
#or
pd.crosstab(y_test, y_pred, rownames=['Actual'], colnames=['Predicted'])


# In[37]:


# k=100
#instantiate the model
knn = KNeighborsClassifier(n_neighbors=100)

#fit the model to the training set
knn.fit(X_train, y_train)

#getting predicted results
y_pred = knn.predict(X_test)
print(y_pred)


# In[38]:


#calculating recall score
recall = recall_score(y_test, y_pred, average='weighted')
print('Recall: %.3f' % recall)


# In[39]:


# k=200
#instantiate the model
knn = KNeighborsClassifier(n_neighbors=200)

#fit the model to the training set
knn.fit(X_train, y_train)

#getting predicted results
y_pred = knn.predict(X_test)
print(y_pred)


# In[40]:


#calculating recall score
recall = recall_score(y_test, y_pred, average='weighted')
print('Recall: %.3f' % recall)


# In[41]:


#Print the Confusion Matrix with k =200 and slice it into four pieces
cm = confusion_matrix(y_test, y_pred)
print('Confusion matrix\n\n', cm)
print('\nTrue Positives(TP) = ', cm[0,0])
print('\nTrue Negatives(TN) = ', cm[1,1])
print('\nFalse Positives(FP) = ', cm[0,1])
print('\nFalse Negatives(FN) = ', cm[1,0])


# In[42]:


#now trying with the dataframe without duplicated rows


# In[43]:


#dropping duplicated rows
df_Binary2 = df_Binary.drop_duplicates()


# In[44]:


df_Binary2.to_csv(r'C:\Users\User\Desktop\capstone\excel sheets\After_dropping_duplicated.csv',index=False)


# In[45]:


#repeating training and testing knn model


# In[46]:


X = df_Binary2.drop(['Disease'], axis=1)
y=df_Binary2['Disease']


# In[62]:


X_train2, X_test2, y_train2, y_test2 = train_test_split(X, y, test_size = 0.2, random_state = 42)


# In[63]:


X_train2.shape


# In[64]:


# k=3 
#instantiate the model
knn = KNeighborsClassifier(n_neighbors=3)

#fit the model to the training set
knn.fit(X_train2, y_train2)
y_pred2 = knn.predict(X_test2)
recall = recall_score(y_test2, y_pred2, average='weighted')
print('Recall: %.3f' % recall)


# In[65]:


y_pred2 = knn.predict(X_test2)
print(y_pred2)


# In[66]:


#calculating recall score
recall = recall_score(y_test2, y_pred2, average='weighted')
print('Recall: %.3f' % recall)


# In[67]:


print('Model accuracy score: ', accuracy_score(y_test2, y_pred2))


# In[68]:


#Print the Confusion Matrix with k =3 and slice it into four pieces
cm = confusion_matrix(y_test2, y_pred2)
print('Confusion matrix\n\n', cm)
print('\nTrue Positives(TP) = ', cm[0,0])
print('\nTrue Negatives(TN) = ', cm[1,1])
print('\nFalse Positives(FP) = ', cm[0,1])
print('\nFalse Negatives(FN) = ', cm[1,0])


# In[69]:


# k=5
#instantiate the model
knn = KNeighborsClassifier(n_neighbors=5)

#fit the model to the training set
knn.fit(X_train2, y_train2)

y_pred2 = knn.predict(X_test2)
recall = recall_score(y_test2, y_pred2, average='weighted')
print('Recall: %.3f' % recall)


# In[70]:


#calculating recall score
recall = recall_score(y_test2, y_pred2, average='weighted')
print('Recall: %.3f' % recall)


# In[71]:


# k=7
#instantiate the model
knn = KNeighborsClassifier(n_neighbors=7)

#fit the model to the training set
knn.fit(X_train2, y_train2)

y_pred2 = knn.predict(X_test2)
recall = recall_score(y_test2, y_pred2, average='weighted')
print('Recall: %.3f' % recall)


# In[72]:


#calculating recall score for k-7
recall = recall_score(y_test2, y_pred2, average='weighted')
print('Recall: %.3f' % recall)


# In[73]:


#Print the Confusion Matrix with k =7 and slice it into four pieces
cm = confusion_matrix(y_test2, y_pred2)
print('Confusion matrix\n\n', cm)
print('\nTrue Positives(TP) = ', cm[0,0])
print('\nTrue Negatives(TN) = ', cm[1,1])
print('\nFalse Positives(FP) = ', cm[0,1])
print('\nFalse Negatives(FN) = ', cm[1,0])


# In[ ]:





# In[ ]:




