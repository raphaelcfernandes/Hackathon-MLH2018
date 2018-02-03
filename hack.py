
# read in the information extracted from the EOB 
# [{treatment:(detail,date)}]
def ReadEOB(path):
	f = open(path,'r')
	f.readline()
	lines = f.readlines()
	dbEOB = []
	for line in lines:
		line = line.strip().split(",")
		entry = {}
		entry[line[0]] = (line[1].strip(),line[2].strip())
		dbEOB.append(entry)
	f.close()
	return dbEOB

# read in the overall information of patients 
# [[simptoms,allergy,age,weight,empty stomach,date]]
def ReadGeneral(path):
	f = open(path,'r')
	f.readline()
	lines = f.readlines()
	dbGeneral = []
	for line in lines:
		line = line.strip().split(",")
		dbGeneral.append(line)
	f.close()
	return dbGeneral

# based on the past medical history, how serious is the situation
def DangerWeight(dbEOB,dbGeneral,dbInteraction):
	




print(ReadEOB("EOB.csv"))
print(ReadGeneral("General.csv"))
