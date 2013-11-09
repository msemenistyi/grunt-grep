Option Explicit
Dim Count As Integer '@grep mob:s
Private Sub Form_Load() '@grep mob:e
    Count = 0
    Timer1.Interval = 1000 '@grep units
End Sub
Private Sub Timer1_Timer() '@grep mob
    Count = Count + 1 '@grep user:s
    Label1.Caption = Count
End Sub '@grep user:e