import pymysql

# 创建连接
conn = pymysql.connect(
  host="localhost",
  user="root",
  password="123456",
  database="company_db"
)

# 执行查询
cursor = conn.cursor()
cursor.execute("SELECT * FROM employees")

# 获取结果
for row in cursor.fetchall():
  print(row)