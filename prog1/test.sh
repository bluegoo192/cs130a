#!/bin/bash

make
TESTDIR="./realtest/"   # change it to your directory

for i in `ls $TESTDIR/*.in`
do
    f=`basename $i |cut -d'.' -f1`
    ./prog1 < ./$TESTDIR/$f.in > $f.out
    diff -w ./$TESTDIR/output/$f.out $f.out   # Assumes TESTDIR/output contains all the expected outputs
    if [ $? -eq 0 ]
    then
        echo "Testcase: $f : OK"
        rm $f.out
    else
        echo "Testcase: $f : NOT OK"
    fi
done
