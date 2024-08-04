#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
df = pd.read_csv(r'customers_credit_cards.csv')


# In[2]:


result = df.head(10)
print("The first 10 rows of the dataframe are: ")
print(result)


# In[3]:


data = df.iloc[:5,:5]
print("The first 5 rows and 5 columns of the dataframe are:")
print(data)


# In[4]:


df.info()


# In[5]:


df.describe()


# In[6]:


import matplotlib.pyplot as plt
df.hist(bins = 50, figsize= (20,15))
plt.savefig("attributes_histograms")
plt.show()


# In[7]:


#see missing values
df.isna().any()


# In[8]:


df.isna().sum()


# In[9]:


mean_value= df['CREDIT_LIMIT'].mean()
print("Mean value is ")
print(mean_value)
df['CREDIT_LIMIT'].fillna(value = mean_value,inplace=True)
df['MINIMUM_PAYMENTS'].fillna(value = mean_value,inplace=True)
df.to_csv(r'C:\Users\User\Desktop\maaref\year 3\Fall 23-24\projects\csc458\DataAfterReplacingWithMean.csv')


# In[10]:


df.isna().any()


# In[11]:


subsetAfterDropDuplicateValue = df.drop_duplicates(subset= None,keep='first',inplace=True)


# In[12]:


print(subsetAfterDropDuplicateValue)


# In[13]:


print(df)


# In[14]:


df.drop('CUST_ID', axis = 1, inplace = True)


# In[15]:


df.info()


# In[16]:


import matplotlib.pyplot as plt
import seaborn as sb
import numpy as np
matrix = np.triu(df.corr())
sb.set_style("white")
f,ax=plt.subplots(figsize=(16,16))
sb.heatmap(df.corr(),annot=True,fmt=".2f",
           vmin = -1,
           vmax = 1, mask = matrix, cmap = "coolwarm", 
           linewidth = 0.2, linecolor = "white")
plt.xticks(rotation=70)
plt.yticks(rotation=0)
plt.title('Correlation Map', size=14)
plt.show()


# In[17]:


from sklearn.feature_selection import RFE
from sklearn.linear_model import LinearRegression
dummytarget=df["BALANCE"].values
Model = LinearRegression()
rfe = RFE(Model, n_features_to_select=5)  # You can adjust the number of features to select
features_selected = rfe.fit_transform(df,dummytarget)


# In[18]:


selected_feature_names = df.columns[0:][rfe.support_]
print("Selected Feature Names:", selected_feature_names)


# In[19]:


#df.drop(columns=['PURCHASES','INSTALLMENTS_PURCHASES','PURCHASES_FREQUENCY','ONEOFF_PURCHASES_FREQUENCY','PURCHASES_TRX','CREDIT_LIMIT','MINIMUM_PAYMENTS','TENURE','BALANCE_FREQUENCY','ONEOFF_PURCHASES','PURCHASES_INSTALLMENTS_FREQUENCY','CASH_ADVANCE_TRX'], axis=1, inplace=True)
df.drop('PURCHASES', axis = 1,inplace=True)
df.drop('INSTALLMENTS_PURCHASES', axis = 1,inplace=True)
df.drop('PURCHASES_FREQUENCY', axis = 1,inplace=True)
df.drop('ONEOFF_PURCHASES_FREQUENCY', axis = 1,inplace=True)
df.drop('PURCHASES_TRX', axis = 1,inplace=True)
df.drop('CREDIT_LIMIT', axis = 1,inplace=True)
df.drop('MINIMUM_PAYMENTS', axis = 1,inplace=True)
df.drop('TENURE', axis = 1,inplace=True)
df.drop('BALANCE_FREQUENCY', axis = 1,inplace=True)
df.drop('ONEOFF_PURCHASES', axis = 1,inplace=True)
df.drop('PURCHASES_INSTALLMENTS_FREQUENCY', axis = 1,inplace=True)
df.drop('CASH_ADVANCE_TRX', axis = 1,inplace=True)


# In[20]:


df.info()


# In[21]:


import pandas as pd
import seaborn as sns
from matplotlib import pyplot as plt
from sklearn.cluster import KMeans
import sklearn.cluster as cluster
from sklearn.preprocessing import MinMaxScaler


# In[47]:


scaler = MinMaxScaler()
scale = scaler.fit_transform(df[['BALANCE','CASH_ADVANCE','CASH_ADVANCE_FREQUENCY','PAYMENTS','PRC_FULL_PAYMENT']])
df_scale = pd.DataFrame(scale, columns = ['BALANCE','CASH_ADVANCE','CASH_ADVANCE_FREQUENCY','PAYMENTS','PRC_FULL_PAYMENT'])
df_scale.head(5)


# In[52]:


df_scale.info()
df_scale.to_csv("DataAfterScaling.csv")


# In[49]:


subset = df_scale.sample(frac = 0.5)
subset.shape


# In[51]:


print(subset)
subset.to_csv("DataAfterSampling.csv")


# In[45]:


model = KMeans(n_clusters=5)
cluster_predicted = model.fit_predict(subset)


# In[46]:


model.cluster_centers_


# In[43]:


subset['Clusters'] = model.labels_
print(subset)


# In[37]:


K = range(2,12)
wss = []
for k in K:
    model = KMeans(n_clusters=k)
    model = model.fit(subset)
    wss_iter = model.inertia_
    wss.append(wss_iter)


# In[38]:


plt.xlabel('K')
plt.ylabel('Within-Cluster-Sum of Squared Errors (WSS)')
plt.plot(K,wss)


# In[44]:


subset.to_csv("Credit_card_With_5Clusters.csv")


# In[40]:


sns.scatterplot(x="CASH_ADVANCE_FREQUENCY", y="PRC_FULL_PAYMENT",hue = 'Clusters',data=subset,palette='viridis')


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




