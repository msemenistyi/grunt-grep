long some_function();
/* int_val */ other_function();

/* int_val */ calling_function()
{
	long test1;
	register /* int_val */ test2;

	test1 = some_function(); /* long_val */
	if (test1 > 0)
		test2 = 0;
	else
		test2 = other_function();
	return test2;
}