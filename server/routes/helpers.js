
// Makes sure the current request is from an authenticated user
function isAuthenticated(req, res, next)
{
	if (req.user) {
		return next();
	}
	else
	{
		// NOTE: couldn't get redirection to work.
		// ATM the plan is to make every caller do it themselves :(
		//return res.redirect('/login');

		return res.status(401).json({
			error: 'User not authenticated'
		});
	}
}

module.exports = {
	isAuthenticated: isAuthenticated,
};

