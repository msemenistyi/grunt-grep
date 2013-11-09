-- Type annotation (optional)
factorial :: Integer -> Integer
 
-- @grep Using:s 
factorial 0 = 1
factorial n | n > 0 = n * factorial (n - 1)
-- @grep Using:e 
 
-- @grep Using recursion but written without pattern matching
factorial n = if n > 0 then n * factorial (n-1) else 1
 
-- @grep Using a list
factorial n = product [1..n]
 
-- @grep Using fold (implements product)
factorial n = foldl1 (*) [1..n]
 
-- Point-free style
factorial = foldr (*) 1 . enumFromTo 1
 
-- Point-free style analytic solution
import Math.Gamma
factorial = round . exp . lnGamma . fromIntegral . (+1)