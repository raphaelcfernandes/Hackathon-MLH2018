import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import sys
#Exercise 1

print('Exercise 1')
myDictionary = {'Team1': 4, 'Team2': 3, 'Team3': 5, 'Team4': 2}
myDictionary['Team5'] = 5
print(myDictionary.keys())
print('Length of the dictionary: ',len(myDictionary))
print('Avg score of the teams: ',sum(myDictionary.values())/len(myDictionary))

#Exercise 2
print('\n\nExercise 2')
myNumpyArray = np.array([[0,0],[1,1],[2,4],[3,9],[4,16],[5,25]])
colLabels = ['x','y']
myNumpyArray = pd.DataFrame(myNumpyArray,columns = colLabels)
print(myNumpyArray)
sys.stdout.flush()
plt.plot(myNumpyArray.x,myNumpyArray.y,marker='o')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Exercise 2 graph')
plt.show()

sys.stdout.flush()