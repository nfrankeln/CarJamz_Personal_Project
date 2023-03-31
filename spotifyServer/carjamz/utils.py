def get_n_items(lst, n):
    if len(lst) < n:
        return lst
    else:
        return lst[:n]