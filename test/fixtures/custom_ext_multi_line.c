long some_function();
/*@grep int_val:s */ other_function();

/*@grep int_val:e */ calling_function()
{
	long test1;

	test1 = some_function(); /*@grep long_val */
	if (test1 > 0)
		test2 = 0;
	else
		test2 = other_function();
	return test2;
}