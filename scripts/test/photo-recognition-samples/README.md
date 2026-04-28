# Photo Recognition Samples

These 10 PNG files are synthetic Japanese document samples created for TEBIQ
recognition testing. They are not official forms and do not contain real personal
data.

Run the live recognition check with:

```bash
tsx --env-file=.env.local scripts/test/test-recognition.ts
```

The script does not print environment variable values. If AWS Bedrock variables
are not configured, it exits with a skip message.
