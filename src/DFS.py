from collections import deque


maze = [[0,0,0,0,0,0,1,0],
        [0,0,0,0,0,0,1,0],
        [0,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,1,0],
        [1,1,0,1,1,1,1,0],
        [0,1,1,1,0,0,0,0]]
        

def mazeTraverse(maze):
    stack = deque()
    row = 5
    col = 0
    while (row != 0 and row != len(maze) and col != len(maze[0])):
        print(f"You are at {row}, {col}")
        stack.append((row, col))
        if (maze[row][col+1] == 1):
            # go straight
            col+=1
        elif (maze[row-1][col] == 1):
            # go left
            row-=1
        elif (maze[row+1][col] == 1):
            # go right
            row+=1
        elif (maze[row][col-1] == 1):
            col-=1
            # go back
        else:
            row, col = stack.pop()
    return stack


            # expect value 12
maze = [[0,'.','.','.','.','.',0],
       ['.',0,0,0,0,0,'.'],
       ['.',0,0,0,0,0,'.'],
       ['.',0,0,1,0,0,'.'],
       ['.',0,0,0,0,0,'.'],
       ['.',0,0,1,0,0,'.'],
       [0,'.','.','.','.','.',0]]

def printMaze(maze):
    for row in maze:
        for col in row:
            print(col, end=" ")
        print()


# call with row = 3, col = 0

# distanceFromXY(hom,6,0,0,0,0,0,1,0)
def distanceFromXY(maze, row, col, rowDir, colDir, total, list):
    print(f"You are at {row}, {col}")
    if ((total != 0) and (row == 0 or col == 0 or row == len(maze)-1 or col == len(maze)-1)):
        list.append((row, col))
        return total # base case, reach the end
    elif (maze[row][col] == 1):
        # swap the two directions
        if (rowDir == 0):
            # if moving along the col
            return total * distanceFromXY(maze, row-colDir, col, -colDir, 0, 1, list)
        else:
            # if moving along the row
            return total * distanceFromXY(maze, row, col-rowDir, 0, -rowDir, 1, list)
    elif (maze[row][col] == 2):
           # swap the two directions
        if (rowDir == 0):
            # if moving along the col
            return total * distanceFromXY(maze, row+colDir, col, colDir, 0, 1, list)
        else:
            # if moving along the row
            return total * distanceFromXY(maze, row, col+rowDir, 0, rowDir, 1, list)
    else:
        return distanceFromXY(maze, row+rowDir, col+colDir, rowDir, colDir, total+1, list)
    

ending = []
row = 5
col = 0
distance = distanceFromXY(maze, row, col, row, col, 0, 1, 0, ending)
maze[row][col] = distance
maze[ending[0][0]][ending[0][1]] = distance


printMaze(maze)
print(distance)
print(ending)





"""""""""
elif (maze[row][col] == "2"):
        # swap the two directions, but now go opposite directions
        if (rowDir != 0):
            # if moving along the col
            rowDir, colDir = 0, -rowDir
        elif (colDir != 0):
            # if moving along the row
            rowDir, colDir = -colDir, 0
"""""""""