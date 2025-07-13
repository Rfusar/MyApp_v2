from argparse import ArgumentParser
from DBTest import Dbtest

cmd = ArgumentParser(
    prog="db_test",
)

cmd.add_argument(
        "-s","--system",
        choices=["collections"],
        help="interroga il Database",
        required=False
)
cmd.add_argument(
        "-t","--test",
        choices=["view", "insert"],
        help="interroga il Database",
        required=False
)

args = cmd.parse_args()

db = Dbtest()

if args.system == "collections": db.SYS_Collections()



